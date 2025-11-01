import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import './SignUpPage.css';

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
      navigate('/posts');
    } catch (err) {
      setErrorMsg('Sign Up Failed - Try Again');
      console.log(err);
    }
  }

  const disable = formData.password !== formData.confirm;

  return (
    <div className="signup-page">
      <div className="signup-card shadow-lg">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join us to explore more features</p>

        <form onSubmit={handleSubmit} autoComplete="off" className="signup-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <button type="submit" className="signup-btn" disabled={disable}>
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="login-link">
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
