import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function Home() {
  let user;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    user = null;
  }

  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center flex-column text-center mt-5 px-3">
      <Card className="p-4 shadow" style={{ maxWidth: '500px', backgroundColor: '#f6f9f6' }}>
        <h2 className="mb-3" style={{ color: '#88b04b' }}>
          Welcome, {user?.name || 'Guest'}!
        </h2>
        <p style={{ color: '#555' }}>
          Ready to check your symptoms? Click below to get started.
        </p>
        <Button
          variant="success"
          className="mt-3"
          style={{ backgroundColor: '#88b04b', borderColor: '#88b04b' }}
          onClick={() => navigate('/predict')}
        >
          🩺 Check My Symptoms
        </Button>
      </Card>
    </div>
  );
}

export default Home;
