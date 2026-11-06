
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from "../Api/axios";
import type { Department } from "../Types/department";
import toast from "react-hot-toast";

interface EditEmployeeForm {
  name: string;
  email: string;
  dept_id: string;
}

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditEmployeeForm>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      dept_id: "",
    },
  });

  // Fetch employee and department details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [employeeResponse, departmentResponse] =
          await Promise.all([
            api.get(`/employee/${id}`),
            api.get("/department"),
          ]);

        const employee = employeeResponse.data;

        const departmentList = Array.isArray(departmentResponse.data)
          ? departmentResponse.data
          : departmentResponse.data?.data;

        if (!Array.isArray(departmentList)) {
          throw new Error("Invalid department response");
        }

        setDepartments(departmentList);

        // Fill existing employee details into the form
        reset({
          name: employee.name,
          email: employee.email,
          dept_id: String(employee.dept_id),
        });

      } catch (err) {
        console.error("Fetch employee error:", err);
        setError("Unable to fetch employee or department details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, reset]);

  // Update employee
  const onSubmit = async (data: EditEmployeeForm) => {
    try {
      setError("");

      const employeeData = {
        name: data.name.trim(),
        email: data.email.trim(),
        dept_id: Number(data.dept_id),
      };

      await api.put(`/employee/${id}`, employeeData);

      toast.success("Employee updated successfully!");

      navigate("/employees");

    } catch (err) {
      console.error("Update employee error:", err);
      setError("Unable to update employee.");
    }
  };

  if (loading) {
    return <p className="p-6">Loading employee details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          Edit Employee
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          {/* Employee Name */}
          <div>
            <label className="block mb-1">
              Employee Name
            </label>

            <input
              type="text"
              {...register("name", {
                required: "Employee name is required",
                minLength: {
                  value: 3,
                  message: "Name must contain at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name cannot exceed 30 characters",
                },
                pattern: {
                  value: /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/,
                  message: "Each word must start with a capital letter",
                },
                validate: (value) =>
                  value.trim().length >= 3 ||
                  "Name must contain at least 3 non-space characters",
              })}
              className="w-full border rounded-lg p-3"
            />

            {errors.name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">
              Email
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full border rounded-lg p-3"
            />

            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1">
              Department
            </label>

            <select
              {...register("dept_id", {
                required: "Please select a department",
              })}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </option>
              ))}
            </select>

            {errors.dept_id && (
              <p className="text-red-600 text-sm mt-1">
                {errors.dept_id.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-600">{error}</p>
          )}

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Employee"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
