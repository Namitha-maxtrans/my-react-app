
import { useEffect, useState } from "react";
import axios from "axios";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  filterFns,
  getPaginationRowModel,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  ColumnFiltersState,
} from "@tanstack/react-table";

import type { Product } from "../types";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

// /// Define columns
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "title",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    enableGlobalFilter: false,
    cell: ({ getValue }) =>
      `$${Number(getValue()).toFixed(2)}`,
  },
];

function ProductTable() {
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Global filter state
  const [globalFilter, setGlobalFilter] = useState("");

  // Column filter state
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);

  // //// Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get<ProductsResponse>(
          "https://dummyjson.com/products"
        );

        setProducts(response.data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  ////// Create table instance
  const table = useReactTable({
    data: products,
    columns,

    state: {
      globalFilter,
      columnFilters,
    },

    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    globalFilterFn: filterFns.includesString,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  console.log(table.getState().pagination.pageSize); /// to get page default size

  //// Loading state
  if (loading) {
    return (
      <p className="p-6 text-gray-600">
        Loading products...
      </p>
    );
  }

  // // Error state
  if (error) {
    return (
      <p className="p-6 text-red-600">
        {error}
      </p>
    );
  }

  // // Get the Category column
  const categoryColumn = table.getColumn("category");

  //// Generate unique categories dynamically
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // // Render table
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Product List
        </h1>

        {/* Global Search */}
        <input
          type="text"
          placeholder="Search by product name or category..."
          value={globalFilter}
          onChange={(event) =>
            setGlobalFilter(event.target.value)
          }
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
        />
{/*Category Filter */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <label
            htmlFor="categoryFilter"
            className="font-medium text-gray-700"
          >
            Filter by category:
          </label>

          <select
            id="categoryFilter"
            value={
              (categoryColumn?.getFilterValue() as string) ?? ""           /*get current filter value */
            }
            onChange={(event) =>
              categoryColumn?.setFilterValue(
                event.target.value || undefined
              )
            }
            className="rounded-lg border border-gray-300 bg-white p-3"
          >
            <option value="">All categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

         
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-blue-600 text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-3">
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          disabled={!header.column.getCanSort()}
                          className="font-semibold disabled:cursor-default"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {{
                            asc: " ▲",
                            desc: " ▼",
                          }[
                            header.column.getIsSorted() as string
                          ] ?? ""}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-blue-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-3 text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-5 text-center text-gray-500"
                  >
                    No matching products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

            {/* Pagination Controls */}
      <div className="mt-5 flex items-center justify-between gap-4">

        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {table.getState().pagination.pageIndex + 1}
          {" "}of{" "}
          {table.getPageCount()}
        </span>

        <button
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>

      </div>  
        {/* Filtered Product Count */}
        <p className="mt-4 text-sm text-gray-500">
          Total products displayed:{" "}
          {table.getFilteredRowModel().rows.length}
        </p>
      </div>
    </div>
  );
}

export default ProductTable;
