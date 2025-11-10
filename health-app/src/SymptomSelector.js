// src/SymptomSelector.js
import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';

const symptoms = [
  "fever", "cough", "headache", "sore_throat", "fatigue",
  "runny_nose", "shortness_of_breath", "chest_pain", "nausea", "diarrhea",
  "body_pain", "loss_of_smell", "dizziness", "vomiting", "joint_pain", "rash"
];

function SymptomSelector() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(Array(symptoms.length).fill(null));
  const [result, setResult] = useState(null);
  const [advice, setAdvice] = useState('');

  const handleAnswer = (value) => {
    const updated = [...selected];
    updated[index] = value;
    setSelected(updated);

    if (index + 1 < symptoms.length) {
      setIndex(index + 1);
    } else {
      submitToBackend(updated);
    }
  };

  const submitToBackend = async (answers) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ symptoms: answers })
      });

      const data = await res.json();
      console.log("✅ Backend responded:", data);
      console.log("Sent answers:", answers);
      console.log("Token sent:", token);


      setResult(data.prediction);
      setAdvice(data.suggestion);

      const history = JSON.parse(localStorage.getItem('history')) || [];
      history.push({ prediction: data.prediction, date: new Date() });
      localStorage.setItem('history', JSON.stringify(history));
    } catch (err) {
      console.error('Prediction failed:', err);
      setResult('Error');
      setAdvice('Something went wrong while connecting to the backend.');
    }
  };

  return (
    <Card className="mx-auto mt-5 p-4 shadow" style={{ maxWidth: '500px' }}>
      {!result ? (
        <>
          <h4 className="mb-3 text-center">Symptom {index + 1} of {symptoms.length}</h4>
          <p className="text-center fs-5">Do you have <strong>{symptoms[index].replace(/_/g, ' ')}</strong>?</p>
          <div className="d-flex justify-content-around mt-4">
            <Button variant="success" onClick={() => handleAnswer(1)}>Yes</Button>
            <Button variant="danger" onClick={() => handleAnswer(0)}>No</Button>
          </div>
        </>
      ) : (
        <Alert variant="info" className="text-center">
          <h5>Prediction: <b>{result}</b></h5>
          <p>{advice}</p>
        </Alert>
      )}
    </Card>
  );
}

export default SymptomSelector;
