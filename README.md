# Disease Prediction Web Application

An end-to-end machine learning web app that predicts 10 common diseases based on user-reported symptoms.
Built using Scikit-learn, Flask/FastAPI, and a responsive frontend, this project demonstrates full-stack ML deployment skills with real-time classification and confidence scoring.

---

## Features

* **Multi-Disease Prediction** – Supports 10 diseases using a trained ML classifier
* **User-Friendly Interface** – Simple symptom input and interactive results
* **Machine Learning Powered** – Built with Scikit-learn (Random Forest/Logistic Regression)
* **Real-Time Predictions** – Instant results with probability-based confidence
* **Responsive UI** – Works seamlessly on both desktop and mobile

---

## Tech Stack

### Backend

* Python 3.8+
* Flask / FastAPI – Web API framework
* Scikit-learn – ML model training & prediction
* Pandas, NumPy – Data preprocessing and transformation

### Frontend

* HTML5 – Page structure
* CSS3 – Styling & responsive layout
* JavaScript – Dynamic interactions

---

## Project Structure

```
disease-prediction-app/
│
├── app.py                        # Main Flask/FastAPI app
├── model/
│   ├── train_model.py            # Model training script
│   ├── disease_model.pkl         # Trained ML model
│   └── symptom_encoder.pkl       # Encoders for symptom features
│
├── static/
│   ├── css/
│   │   └── style.css             # Custom styles
│   ├── js/
│   │   └── script.js             # Frontend interactivity
│   └── images/                   # App images and assets
│
├── templates/
│   └── index.html                # Main web page
│
├── data/
│   └── training_data.csv         # Dataset for model training
│
├── requirements.txt              # Project dependencies
└── README.md                     # Documentation
```

---

## Supported Diseases

1. Diabetes
2. Hypertension
3. Asthma
4. Arthritis
5. Migraine
6. Thyroid Disorder
7. Heart Disease
8. Kidney Disease
9. Liver Disease
10. Respiratory Infection

---

## Quick Start

### Prerequisites

* Python 3.8+
* pip (Python package manager)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/iamsudaiskhan/disease-prediction-app.git
   cd disease-prediction-app
   ```

2. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

3. Run the application

   ```bash
   python app.py
   ```

4. Open in browser

   ```
   http://localhost:5000
   ```

---

## Machine Learning Model

### Model Details

* Algorithm: Random Forest / Logistic Regression
* Type: Multi-class classification
* Input: Binary symptom features
* Output: Probabilities for 10 disease classes

### Data Processing

* Dataset: Curated symptom–disease relationships
* Preprocessing: Encoding, normalization, validation
* Evaluation: Cross-validation, confusion matrix

## Disclaimer

This application is for educational and demonstration purposes only.
It is not a substitute for professional medical advice, diagnosis, or treatment.
Always consult a qualified healthcare provider for any medical concerns.

---

## Customization

To retrain the model with updated data:

```bash
python model/train_model.py
```

---

## License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it with attribution.

---

## Author

**Sudais Khan**
Email: [iamsudaiskhan007@gmail.com](mailto:iamsudaiskhan007@gmail.com)

---

## Contributing

Contributions, feature requests, and feedback are welcome.
Check out the [issues page](https://github.com/iamsudaiskhan/disease-prediction-app/issues) to get started.

If you find this project helpful, please consider giving it a star.
