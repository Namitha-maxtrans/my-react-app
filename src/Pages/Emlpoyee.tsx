
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import api from "../Api/axios";

import type { Employee } from "../Types/employee";
import type { Department } from "../Types/department";

import toast from "react-hot-toast";

// Redux imports
import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/reduxHooks";

import { fetchEmployees } from "../features/employeeSlice";

function Employees() {
  const navigate = useNavigate();

  // 1. Redux hooks
  const dispatch = useAppDispatch();

  // 2. Get employee data from Redux
  const {
    employees: data,
    loading,
    error,
  } = useAppSelector((state) => state.employees);

  // 3. Department data (local state)
  const [departments, setDepartments] = useState<Department[]>([]);

  // 4. Global search
  const [globalFilter, setGlobalFilter] = useState("");

  // 5. Department filter
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);

  // 6. Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await api.get("/department");

      const departmentList = Array.isArray(response.data)
        ? response.data
        : response.data?.data;

      if (Array.isArray(departmentList)) {
        setDepartments(departmentList);
      } else {
        console.error(
          "Departments are not in array format:",
          response.data
        );
        setDepartments([]);
      }
    } catch (err) {
      console.error("Fetch departments error:", err);
      setDepartments([]);
    }
  };

  // 7. Fetch employees and departments when page loads
  useEffect(() => {
    dispatch(fetchEmployees());
    fetchDepartments();
  }, [dispatch]);

  // 8. Delete employee
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/employee/${id}`);

      toast.success("Employee deleted successfully!");

      // Fetch updated employee list through Redux
      await dispatch(fetchEmployees());
    } catch (err) {
      console.error("Delete employee error:", err);
      toast.error("Unable to delete employee.");
    }
  };

  // 9. Define table columns
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "id",
      header: "Employee ID",
    },
    {
      accessorKey: "name",
      header: "Employee Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "dept_id",
      id: "dept_id",
      header: "Department",

      cell: ({ getValue }) => {
        const departmentId = Number(getValue());

        const department = departments.find(
          (dept) => dept.id === departmentId
        );

        return department?.name ?? `Department ${departmentId}`;
      },

      filterFn: (row, columnId, filterValue) => {
        return (
          filterValue === "" ||
          String(row.getValue(columnId)) === filterValue
        );
      },
    },
    {
      accessorKey: "date_of_joining",
      header: "Joining Date",

      cell: ({ getValue }) => {
        const value = getValue<string>();

        return value
          ? new Date(value).toLocaleDateString("en-IN")
          : "-";
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      enableColumnFilter: false,

      cell: ({ row }) => (
        <div className="flex gap-3">
          <button
            onClick={() =>
              navigate(`/employees/edit/${row.original.id}`)
            }
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // 10. Configure TanStack Table
  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
      columnFilters,
    },

    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  // 11. Loading state
  if (loading) {
    return <p className="p-6">Loading employees...</p>;
  }

  // 12. Error state
  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>

        <button
          onClick={() => dispatch(fetchEmployees())}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // 13. Employee table UI
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Employee Management
          </h1>

          <button
            onClick={() => navigate("/employees/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Employee
          </button>
        </div>

        {/* Global Search */}
        <input
          id="employee-search"
          name="employee-search"
          type="text"
          placeholder="Search employees..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border rounded-lg p-3 mb-4 w-full"
        />

        {/* Department Filter */}
        <div className="mb-4">
          <label
            htmlFor="department-filter"
            className="block mb-2 font-medium"
          >
            Filter by Department
          </label>

          <select
            id="department-filter"
            name="department-filter"
            value={
              (table.getColumn("dept_id")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn("dept_id")?.setFilterValue(e.target.value)
            }
            className="border rounded-lg p-3 w-full"
          >
            <option value="">All Departments</option>

            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border p-3 text-left"
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          disabled={!header.column.getCanSort()}
                          className="font-semibold disabled:cursor-default"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? ""}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="border p-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        ) ?? String(cell.renderValue() ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-5"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-5">
          <p>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border px-4 py-2 rounded disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border px-4 py-2 rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Employees;
