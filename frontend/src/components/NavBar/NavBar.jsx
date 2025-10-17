import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user }) {
  const navigate = useNavigate();
  function handleLogOut() {
    logOut();
    setUser(null);
    // navigate('/') not working; 
    // The<Link> that was clicked will navigate to '/'
    // Due to async issues

  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          LinguaMath
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/posts">Your Log</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/posts/new">Ask AI</NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav">
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
                  <NavLink className="nav-link" to="/login">Log In</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}