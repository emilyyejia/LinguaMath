import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as authService from '../../services/authService';
import './LogInPage.css';

export default function LogInPage({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
      navigate('/posts/new');
    } catch (err) {
      setErrorMsg('Log In Failed - Try Again');
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  return (
    <div className="login-page">
      <div className="login-card shadow-lg">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Log in to continue your journey</p>

        <form onSubmit={handleSubmit} autoComplete="off" className="login-form">
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

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{' '}
          <span onClick={() => navigate('/signup')} className="signup-link">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
