import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as authService from '../../services/authService';

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
    <div
      className="d-flex flex-column justify-content-start align-items-center vh-100"
      style={{ paddingTop: '10vh' }} // Moves form slightly down from top
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Log In</h2>

        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
            <input
              type="email"
              className="form-control form-control-lg"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
          </div>

          {/* Password */}
          <div className="mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
            <input
              type="password"
              className="form-control form-control-lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: '#2ddc2d', borderColor: '#2ddc2d', color: 'white' }}
            >
              LOG IN
            </button>
          </div>
        </form>

        {/* Error Message */}
        {errorMsg && <p className="text-danger mt-2 text-center">{errorMsg}</p>}
      </div>
    </div>
  );
}
