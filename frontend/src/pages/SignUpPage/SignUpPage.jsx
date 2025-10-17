import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';

export default function SignUpPage({setUser}) {
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
        setErrorMsg('Sign Up Failed -Try Again');
        console.log(err);
    }

  }
  const disable = formData.password !== formData.confirm;

  return (
<>
<div className="d-flex flex-column align-items-center" style={{ marginTop: '8vh' }}>
  <div className="w-100" style={{ maxWidth: '400px' }}>
    <h2 className="text-center mb-4">Sign Up</h2>

    <form autoComplete="off" onSubmit={handleSumbit}>
      {/* Name */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your Name"
          aria-label="Name"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <input
          type="email"
          className="form-control form-control-lg"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
          aria-label="Email"
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <input
          type="password"
          className="form-control form-control-lg"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
          aria-label="Password"
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-3">
        <input
          type="password"
          className="form-control form-control-lg"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          required
          placeholder="Confirm Password"
          aria-label="Confirm Password"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={disable}
      >
        SIGN UP
      </button>
    </form>

    {/* Error Message */}
    {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
  </div>
</div>

</>

  );
}