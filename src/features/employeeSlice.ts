import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Employee } from "../Types/employee";
import api from "../Api/axios";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk<Employee[]>(
  "employees/fetchEmployees",
  async () => {
    const response = await api.get("/employee");
    return response.data.data;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })

      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch employees";
      });
  },
});

export default employeeSlice.reducer;