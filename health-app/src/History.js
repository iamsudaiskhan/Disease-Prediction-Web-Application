import React, { useEffect, useState } from 'react';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const userHistory = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(userHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('history');
    setHistory([]);
  };

  return (
    <div>
      <h2 className="mb-3">Your Symptom History</h2>
      {history.length === 0 ? (
        <p>No predictions yet.</p>
      ) : (
        <ul className="list-group">
          {history.map((item, index) => (
            <li key={index} className="list-group-item">
              <strong>Disease:</strong> {item.prediction} <br />
              <small>{new Date(item.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && (
        <button className="btn btn-danger mt-3" onClick={clearHistory}>
          Clear History
        </button>
      )}
    </div>
  );
}

export default History;
