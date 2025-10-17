import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 w-100 bg-light text-center">
      <h1 className="fw-bold mb-3">Welcome to LinguaMath</h1>
      <p className="lead mb-4">
        Discover math in your language, with a little help from AI magic!
      </p>
      <Link to="/login" className="btn btn-primary btn-lg px-4 rounded-pill">
        Get Started
      </Link>
    </div>
  );
}
