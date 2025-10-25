import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';

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

  async function handleSumbit(evt) {
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
    <div
      className="d-flex flex-column justify-content-start align-items-center vh-100"
      style={{ paddingTop: '10vh' }} // Moves form slightly down from top
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Sign Up</h2>

        <form autoComplete="off" onSubmit={handleSumbit}>
          {/* Name */}
          <div className="mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>

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

          {/* Confirm Password */}
          <div className="mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
            <input
              type="password"
              className="form-control form-control-lg"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
            />
          </div>

          {/* Submit Button */}
          <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            <button
              type="submit"
              className="btn w-100"
              disabled={disable}
              style={{ backgroundColor: '#2ddc2dff', borderColor: '#2ddc2dff', color: 'white' }}
            >
              SIGN UP
            </button>
          </div>
        </form>

        {/* Error Message */}
        {errorMsg && <p className="text-danger mt-2 text-center">{errorMsg}</p>}

        {/* Link to Log In */}
        <p className="text-center mt-3">
          Already have an account?{' '}
          <span
            style={{ color: '#2ddc2d', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
