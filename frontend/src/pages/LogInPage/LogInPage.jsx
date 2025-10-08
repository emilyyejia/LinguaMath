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
      navigate('/posts');
    } catch (err) {
      setErrorMsg('Log In Failed - Try Again');
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  return (
<>
<div className="d-flex flex-column align-items-center" style={{ marginTop: '10vh' }}>
  <div className="w-100" style={{ maxWidth: '400px' }}>
    <h2 className="text-center mb-4">Log In</h2>
    <form autoComplete="off" onSubmit={handleSubmit}>

      {/* Email */}
      <div className="input-group input-group-lg mb-3">
        <span className="input-group-text" id="email-addon">Email</span>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-describedby="email-addon"
          placeholder="Email"
        />
      </div>

      {/* Password */}
      <div className="input-group input-group-lg mb-3">
        <span className="input-group-text" id="password-addon">Password</span>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          aria-describedby="password-addon"
          placeholder="Password"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100">
        LOG IN
      </button>
    </form>

    {/* Error Message */}
    {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
  </div>
</div>


</>

  );
}