
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";

import AddEmployee from "../Pages/AddEmployee";
import EditEmployee from "../Pages/EditEmployee";
import Navbar from "../Components/NavBar";
import ProtectedRoute from "../Components/ProctectedRoutes";
import Employees from "../Pages/Emlpoyee";


// Layout for protected pages
function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>

            <Route
              path="/employees"
              element={<Employees />}
            />

            <Route
              path="/employees/add"
              element={<AddEmployee />}
            />

            <Route
              path="/employees/edit/:id"
              element={<EditEmployee />}
            />

            

          </Route>
        </Route>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
