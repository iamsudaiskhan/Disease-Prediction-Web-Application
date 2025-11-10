// src/Login.js
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert(data.error || 'Login failed.');
      }
    } catch (err) {
      alert('Server error during login.');
      console.error(err);
    }
  };

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" className="w-100">Log In</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
