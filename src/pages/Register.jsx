import { useState } from 'react';
import api from '../utils/api.js';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/sign-up', form);
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: 400 }}>
      <div className="card-body">
        <h3 className="card-title text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control my-2" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
          <input className="form-control my-2" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
          <input className="form-control my-2" placeholder="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <button className="btn btn-primary w-100 mt-2">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
