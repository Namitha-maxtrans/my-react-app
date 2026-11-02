import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from "../Api/axios";
import type { Department } from "../Types/department";
import toast from "react-hot-toast";

interface AddEmployeeForm {
  name: string;
  email: string;
  dept_id: string;
  date_of_joining: string;
}

function AddEmployee() {
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddEmployeeForm>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      dept_id: "",
      date_of_joining: "",
    },
  });

  // Department state
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState("");

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/department");

        const departmentList = Array.isArray(response.data)
          ? response.data
          : response.data?.data;

        if (!Array.isArray(departmentList)) {
          throw new Error("Invalid department response");
        }

        setDepartments(departmentList);
      } catch (err) {
        console.error("Fetch departments error:", err);
        setError("Unable to fetch departments.");
      }
    };

    fetchDepartments();
  }, []);

  // Submit form
  const onSubmit = async (data: AddEmployeeForm) => {
    try {
      setError("");

      const employeeData = {
        name: data.name.trim(),
        email: data.email.trim(),
        dept_id: Number(data.dept_id),
        date_of_joining: data.date_of_joining,
      };

      const response = await api.post("/employee", employeeData);

      console.log("Employee created:", response.data);

      toast.success("Employee added successfully!");

      reset();
      navigate("/employees");
    } catch (err) {
      console.error("Add employee error:", err);
      setError("Unable to add employee. Please check the details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Add Employee</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Employee Name */}
          <div>
            <label className="block mb-1">Employee Name</label>

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
                  value: /^[A-Za-z ]+$/,
                  message: "Only letters and spaces are allowed",
                },

                validate: (value) =>
                  value.trim().length >= 3 ||
                  "Name must contain at least 3 non-space characters",
              })}
              placeholder="Enter employee name"
              className="w-full border rounded-lg p-3"
            />

            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",

                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Enter email"
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
            <label className="block mb-1">Department</label>

            <select
              {...register("dept_id", {
                required: "Please select a department",
              })}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
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

          {/* Date of Joining */}
          <div>
            <label className="block mb-1">Date of Joining</label>

            <input
              type="date"
              {...register("date_of_joining", {
                required: "Date of joining is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            {errors.date_of_joining && (
              <p className="text-red-600 text-sm mt-1">
                {errors.date_of_joining.message}
              </p>
            )}
          </div>

          {/* API Error */}
          {error && <p className="text-red-600">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting || departments.length === 0}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg
                  disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </>
              ) : (
                "Save Employee"
              )}
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

export default AddEmployee;
