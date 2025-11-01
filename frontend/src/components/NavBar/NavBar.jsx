import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logOut } from "../../services/authService";
import logo from "../../assets/favicon.png";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          <img
            src={logo}
            alt="LinguaMath Logo"
            style={{ height: "25px", marginRight: "10px" }}
          />
          LinguaMath
        </NavLink>

        {/* Hamburger toggler for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu */}
        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarNav"
        >
          {/* Left side nav */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/posts">
                    Your Log
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/posts/new">
                    Ask AI
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/account">
                    Account
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Right side nav */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">Welcome, {user.name}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogOut}>
                    Log Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Sign Up/In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    Privacy Terms
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/support">
                    Support
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
