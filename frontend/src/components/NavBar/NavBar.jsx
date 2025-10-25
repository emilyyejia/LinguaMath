import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';
import logo from '../../assets/favicon.png';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // check if token exists

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/'); // navigate after logout
  }

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand fw-bold"
          to={isLoggedIn ? "/" : "/"}
        >
          <img
            src={logo}
            alt="LinguaMath Logo"
            style={{ height: '20px', marginRight: '10px' }}
          />
          LinguaMath
        </NavLink>

        {/* Left side links */}
        <ul className="navbar-nav me-auto d-flex flex-row">
          {user && (
            <>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/posts">Your Log</NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/posts/new">Ask AI</NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Right side links */}
        <ul className="navbar-nav d-flex flex-row">
          {user ? (
            <>
              <li className="nav-item me-3">
                <span className="navbar-text">Welcome, {user.name}</span>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="/" onClick={handleLogOut}>
                  Log Out
                </Link>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/login">Log In</NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
