
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../features/authSlice";


function Navbar() {
  const navigate = useNavigate();

  // Read user information from Redux
  const user = useAppSelector((state) => state.auth.user);
  console.log("User from Redux:", user);

  // Get dispatch function
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Clear Redux state
    dispatch(logout());

    // Clear localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-cyan-800 text-white px-6 py-3 flex justify-between items-center shadow-md">

      <span className="text-lg font-semibold tracking-wide">
        Leave Management
      </span>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white text-cyan-800 flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {user?.name || "User"}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-cyan-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
