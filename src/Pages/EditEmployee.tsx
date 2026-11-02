
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ChangeEvent,} from 'react';

import api from '../Api/axios';
import type { Department } from '../Types/department';
import toast from 'react-hot-toast';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dept_id: '',
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch employee and department details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const [employeeResponse, departmentResponse] = await Promise.all([
          api.get(`/employee/${id}`),
          api.get('/department'),
        ]);

        const employee = employeeResponse.data;

        const departmentList = Array.isArray(departmentResponse.data)
          ? departmentResponse.data
          : departmentResponse.data?.data;

        if (!Array.isArray(departmentList)) {
          throw new Error('Invalid department response');
        }

        setDepartments(departmentList);

        setFormData({
          name: employee.name,
          email: employee.email,
          dept_id: String(employee.dept_id),
        });

      } catch (err) {
        console.error('Fetch employee or department error:', err);
        setError('Unable to fetch employee or department details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle input and dropdown changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update employee
  const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const employeeData = {
        name: formData.name,
        email: formData.email,
        dept_id: Number(formData.dept_id),
      };

      await api.put(`/employee/${id}`, employeeData);

      toast.success(' successfully Updated!');

      navigate('/employees');

    } catch (err) {
      console.error('Update employee error:', err);
      setError('Unable to update employee.');
    } finally {
      setLoading(false);
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

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1">Employee Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Department dropdown */}
          <div>
            <label className="block mb-1">Department</label>

            <select
              name="dept_id"
              value={formData.dept_id}
              onChange={handleChange}
              required
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
          </div>

          {error && (
            <p className="text-red-600">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
            >
              Update Employee
            </button>

            <button
              type="button"
              onClick={() => navigate('/employees')}
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
