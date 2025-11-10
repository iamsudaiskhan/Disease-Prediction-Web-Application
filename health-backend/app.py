from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

import pandas as pd
import numpy as np
import json
import os
import joblib

app = Flask(__name__)
CORS(app)

# JWT Setup
app.config['JWT_SECRET_KEY'] = 'your-super-secret-key'  # Change for production
jwt = JWTManager(app)

# Load ML model and label encoder
model = joblib.load('model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

# User storage
USER_FILE = 'users.json'
if not os.path.exists(USER_FILE):
    with open(USER_FILE, 'w') as f:
        json.dump([], f)

def load_users():
    with open(USER_FILE, 'r') as f:
        return json.load(f)

def save_users(users):
    with open(USER_FILE, 'w') as f:
        json.dump(users, f)

# ---------------------------
# Registration
# ---------------------------
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not (name and email and password):
        return jsonify({'error': 'All fields are required'}), 400

    users = load_users()
    if any(u['email'] == email for u in users):
        return jsonify({'error': 'Email already exists'}), 409

    users.append({'name': name, 'email': email, 'password': password})
    save_users(users)
    return jsonify({'message': 'User registered successfully'}), 201

# ---------------------------
# Login (returns JWT token)
# ---------------------------
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    users = load_users()
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)

    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401

    token = create_access_token(identity=user['email'])
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {'name': user['name'], 'email': user['email']}
    }), 200

# ---------------------------
# Predict Disease (Protected)
# ---------------------------
@app.route('/predict', methods=['POST'])
@jwt_required()
def predict():
    data = request.json.get('symptoms')  
    print("🧪 Received symptoms:", data)
    if not isinstance(data, list) or len(data) != 16:
        return jsonify({'error': 'Invalid input format'}), 400

    try:
        input_array = np.array([data])
        prediction_encoded = model.predict(input_array)[0]
        prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]

        suggestions = {
            "Fever": "Stay hydrated and rest. Consult a doctor if fever persists.",
            "Cold": "Take warm liquids and rest. Consider steam inhalation.",
            "Flu": "Stay warm, hydrate well, and take meds if needed.",
            "COVID-19": "Isolate and get tested. Consult your doctor.",
            "Stomach Infection": "Avoid outside food. Drink ORS and stay clean.",
            "Gastritis": "Eat light meals and avoid spicy food.",
            "Asthma": "Use your inhaler and avoid dusty environments.",
            "Pneumonia": "Seek immediate medical help.",
            "Allergy": "Avoid allergens and consult a specialist.",
            "Migraine": "Rest in a dark, quiet room. Avoid triggers."
        }

        return jsonify({
            'prediction': prediction_label,
            'suggestion': suggestions.get(prediction_label, "Please consult a healthcare provider.")
        })

    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

# ---------------------------
# Start server
# ---------------------------
if __name__ == '__main__':
    app.run(debug=True)
