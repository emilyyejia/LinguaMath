import { Link } from "react-router-dom";
import promoImage from '../../assets/promo-image.jpg'; // replace with your image path

export default function HomePage({ user }) {
  return (
    <div className="d-flex flex-column">
      {/* Main Content */}
      <div className="container flex-grow-1 d-flex flex-column justify-content-center py-5">
        {/* Hero Section */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-5 mb-md-0">
            <h1 className="fw-bold mb-3">Discover math with a little AI magic!</h1>
            <p className="lead mb-4">
              Our mission is to empower all students to learn mathematics confidently,
              regardless of language or background.
            </p>
            {!user && (
              <Link
                to="/signup"
                className="btn btn-lg rounded-pill px-4 text-white mb-4 mb-md-0"
                style={{ backgroundColor: '#13e713ff', borderColor: '#13e713ff' }}
              >
                Get Started
              </Link>
            )}
          </div>

          <div className="col-md-6 text-center">
            <img
              src={promoImage}
              alt="Learning Promo"
              className="img-fluid rounded shadow mt-4 mt-md-0"
              style={{ maxHeight: "60vh", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="row text-center my-5">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">AI Assistance</h5>
            <p>
              Get AI-powered translations, cultural explanations,
              and bilingual hints to help you understand and solve problems.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Study Log</h5>
            <p>
              Save all your questions and AI responses to your personal study log,
              track your progress, and review your learning journey over time.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Flexible Input</h5>
            <p>
              You can enter your math questions as text or upload an image of the problem—
              LinguaMath handles both seamlessly.
            </p>
          </div>
        </div>

        {/* District Admin Section */}
        <div className="row justify-content-center text-center">
          <div className="col-md-8">
            <p className="mb-3">
              <Link to="/about" className="fw-bold">Learn more</Link> about our research, team,
              and mission to support multilingual students in learning mathematics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
