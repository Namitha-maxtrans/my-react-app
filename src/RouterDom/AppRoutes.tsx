
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import AddEmployee from '../Pages/AddEmployee';
import Employees from '../Pages/Emlpoyee';
import EditEmployee from '../Pages/EditEmployee';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Employee Table */}
        <Route
          path="/employees"
          element={<Employees />}
        />

        {/* Add Employee Form */}
        <Route
          path="/employees/add"
          element={<AddEmployee />}
        />
        <Route
  path="/employees/edit/:id"
  element={<EditEmployee />}
/>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/employees" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
