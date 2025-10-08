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
      <div className="input-group input-group-lg mb-3">
        <span className="input-group-text" id="name-addon">Name</span>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-describedby="name-addon"
          placeholder="Your Name"
        />
      </div>

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

      {/* Confirm Password */}
      <div className="input-group input-group-lg mb-3">
        <span className="input-group-text" id="confirm-addon">Confirm</span>
        <input
          type="password"
          className="form-control"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          required
          aria-describedby="confirm-addon"
          placeholder="Confirm Password"
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