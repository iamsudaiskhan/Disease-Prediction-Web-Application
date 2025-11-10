// src/Signup.js
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.status === 201) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        alert(data.error || 'Signup failed.');
      }
    } catch (err) {
      alert('Server error during signup.');
      console.error(err);
    }
  };

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title>Sign Up</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" className="w-100">Sign Up</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Signup;
