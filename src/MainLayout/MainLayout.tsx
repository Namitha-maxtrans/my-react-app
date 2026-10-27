import { NavLink, useLocation,  } from "react-router-dom";
import AppRouter from "../RouterDom/AppRouter";


function MainLayout() {
     const location = useLocation();
  return (
   
      <div className="container mt-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">React</h1>

          <nav className="d-flex gap-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </header>
  <p className="mt-3">
        Current page: {location.pathname}
      </p>
        <hr />
<AppRouter />
      </div>
   
  );
}

export default MainLayout;