# Ribbon Haven – AI Cancer Prediction & Health Monitoring Platform

## Project Overview

Ribbon Haven is an AI-powered healthcare and cancer risk detection platform designed to assist users in early cancer screening, health monitoring, and preventive care. The project combines medical image analysis with structured clinical data analysis to provide a unified system for identifying possible cancer risk and guiding users toward healthier decisions.

The platform includes:
- Lung cancer detection from CT scan images
- Breast cancer prediction from tabular medical features
- Patient-friendly health analytics dashboard
- Family history risk visualization
- Personalized prevention and wellness recommendations
- AI-powered health assistant and reminders

This project demonstrates the integration of machine learning, deep learning, web development, and healthcare UX in a single end-to-end application.

---

## Problem Statement

Cancer diagnosis often depends on timely medical screening, specialized interpretation, and consistent follow-up. Many patients may not have immediate access to early screening support, risk analysis, or actionable health guidance. Early detection is critical because it significantly improves treatment outcomes.

This project addresses that gap by building a digital assistant that can:
- analyze CT scan images for suspicious lung cancer patterns,
- evaluate clinical breast cancer indicators from structured patient data,
- present insights in an accessible user dashboard,
- suggest preventive care recommendations and reminders.

---

## Project Objectives

1. Develop an intelligent medical screening dashboard for cancer risk detection.
2. Use AI to detect patterns in both image and tabular medical datasets.
3. Create a user-friendly front-end for non-technical users.
4. Combine prediction, health insights, family history, and recommendations into one app.
5. Show how machine learning can support healthcare decision support systems responsibly.

---

## Core Features

### 1. Lung Cancer Detection from CT Images
- Upload CT images in common formats such as JPG/JPEG/PNG.
- Model accepts 224x224 image input.
- Deep learning model predicts whether the scan corresponds to a normal, benign, or malignant case.
- Uses transfer learning for better medical image classification performance.

### 2. Breast Cancer Prediction from Structured Features
- Accepts numerical clinical features such as radius, texture, area, smoothness, compactness, concavity, and symmetry metrics.
- Uses a trained Random Forest model to classify a patient as malignant or benign.
- The model uses standardized feature values before inference.

### 3. Health Analysis Dashboard
- Displays summary metrics such as health score, heart rate, blood pressure, and completed tests.
- Includes charts and visual analysis of health trends and biomarkers.
- Provides structured health tracking features for patient engagement.

### 4. Family Cancer Risk Report
- Simulates hereditary risk triaging through a family tree visualization.
- Shows different risk levels based on family history patterns.
- Helps users understand potential inherited cancer vulnerability.

### 5. Personalized Health Care Measures
- Provides actionable recommendations on diet, exercise, sleep, prevention, supplements, and stress management.
- Custom recommendations are framed around patient wellness and cancer prevention.

### 6. AI Health Assistant (Elix)
- Interactive chatbot page for healthcare guidance.
- Responds to basic health questions with predefined medical guidance patterns.
- Designed to provide support for general health-related inquiries.

### 7. Reminders and Notifications
- Users can track upcoming health appointments and medications.
- Helps maintain routine health screenings and medication adherence.
- Includes notification preferences and reminder cards.

### 8. Responsive Web UI
- Clean, modern interface using a purple-pink healthcare aesthetic.
- Sidebar navigation with multiple sections such as Home, Test Conduct, Health Reports, Family Report, Health Measures, Chatbot, and Reminders.
- Mobile-friendly and desktop-friendly layout.

---

## Tech Stack Details

### Frontend Technologies
- React.js
- TypeScript
- Vite
- Tailwind CSS
- Material UI / Radix UI components
- Recharts for data visualization
- Lucide React icons
- CSS modules and custom gradients for healthcare theme

### Backend Technologies
- Python
- Flask
- Flask-CORS
- NumPy
- Pillow (PIL)
- TensorFlow / Keras
- scikit-learn
- pandas
- joblib
- matplotlib

### ML / AI Tools
- MobileNetV2 (transfer learning)
- RandomForestClassifier
- StandardScaler
- EarlyStopping callback
- Class weighting for imbalanced data
- Confusion matrix and classification reports
- Data augmentation techniques

### Development Workflow
- Local backend API using Flask on localhost:5000
- Frontend served via Vite dev server
- Model artifacts saved as .keras and .pkl files for inference
- API endpoints used for model prediction from front-end forms and uploads

---

## Project Architecture

The project follows a simple but effective layered architecture:

1. Frontend Layer
   - Built in React and TypeScript
   - Contains all user-facing pages and visual dashboards
   - Sends requests to the backend API

2. API Layer
   - Flask application in Backend/app.py
   - Handles HTTP requests for lung prediction and breast prediction
   - Uses CORS to allow browser interop with the frontend

3. Model Layer
   - Lung CT model saved as lung_ct_model.keras
   - Breast cancer model saved as breast_cancer_model_v2.pkl
   - Scaler saved as scaler_v2.pkl

4. Data Layer
   - CSV breast cancer data from Cancer_Data.csv
   - Lung CT dataset under Datasets/LungCT_Dataset
   - Model training scripts and evaluation plots in the backend and screenshots folders

---

## Data and Datasets

### Breast Cancer Dataset
The project uses the breast cancer Wisconsin dataset stored in:
- Datasets/Cancer_Data.csv

Key characteristics:
- Tabular dataset with 30 numerical clinical features
- Target column: diagnosis
- Diagnosis values mapped as:
  - M = 1 (Malignant)
  - B = 0 (Benign)
- Features include radius, texture, perimeter, area, smoothness, compactness, concavity, and symmetry metrics
- The id column was dropped before training

### Lung CT Dataset
The lung model leverages the IQ-OTH/NCCD lung cancer dataset located in:
- Datasets/LungCT_Dataset

Dataset details:
- CT scan dataset collected from medical centers
- Contains normal, benign, and malignant classes
- CT images are organized in folders by class
- Used for multi-class medical image classification
- The project uses a 3-class classification setup:
  - Normal
  - Benign
  - Malignant

---

## Machine Learning Methods Used

### 1. Breast Cancer Model Pipeline
The breast cancer module uses a supervised classification pipeline:

- Load dataset from CSV
- Remove non-essential id column
- Encode diagnosis labels into binary classes
- Split data into training and test sets (80/20)
- Standardize features using StandardScaler
- Train a RandomForestClassifier with 100 decision trees
- Evaluate with accuracy and classification report
- Save the trained model and scaler using joblib

Model logic in:
- Backend/model2.py

Key implementation details:
- `train_test_split(X, y, test_size=0.2, random_state=42)`
- `StandardScaler()` for feature normalization
- `RandomForestClassifier(n_estimators=100, random_state=42)`
- `accuracy_score()` and `classification_report()` used for evaluation

### 2. Lung Cancer Deep Learning Pipeline
The lung cancer module uses deep learning and transfer learning:

- Dataset loaded from directory using `image_dataset_from_directory`
- 80/20 train-validation split
- Image resizing to 224x224
- MobileNetV2 as pretrained feature extractor
- Preprocessing using `preprocess_input` from Keras MobileNetV2
- Data augmentation with random flip, rotation, and zoom
- GlobalAveragePooling2D to reduce feature maps
- Dense layer with ReLU activation
- Dropout layer for regularization
- Final softmax output layer with 3 classes

Training details:
- Optimizer: Adam
- Loss: sparse categorical cross-entropy
- Metrics: accuracy
- Class weights applied for imbalance handling
- Early stopping used to prevent overfitting
- Fine-tuning step with selective unfreezing of base layers

Model logic in:
- Backend/train_lung_model.py

### 3. Evaluation and Visualization
The project also includes:
- classification reports
- confusion matrix calculation
- accuracy and loss curve plotting
- saved graphs under Screenshots/Results and Accuracy/

---

## Model Details

### Lung CT Model
- Model type: Convolutional Neural Network using MobileNetV2 transfer learning
- Input shape: (224, 224, 3)
- Output classes: 3
  - Normal
  - Benign
  - Malignant
- Regularization: dropout + early stopping
- Fine tuning: selective unfreezing of deeper model layers
- Save format: .keras

### Breast Cancer Model
- Model type: Random Forest Classifier
- Training approach: supervised machine learning on structured clinical data
- Label encoding: malignant = 1, benign = 0
- Feature scaling: StandardScaler
- Save format: .pkl via joblib

---

## Backend API Endpoints

The Flask backend in Backend/app.py exposes two main routes:

### 1. POST /predict-lung
Purpose:
- Accepts an uploaded CT image
- Resizes image to 224x224
- Normalizes pixel values
- Runs the lung model
- Returns prediction index as JSON

Example response:
```json
{ "prediction": 0 }
```

### 2. POST /predict-breast
Purpose:
- Accepts patient features from JSON
- Rescales features using the saved scaler
- Runs the breast cancer model
- Returns a classification result

Example response:
```json
{ "prediction": 1 }
```

---

## Frontend User Experience

The user interface is designed around a healthcare dashboard theme called Ribbon Haven. It is organized into sections:

- Landing/Home page
- Test Conduct page for uploading medical data
- Report Analysis dashboard with charts and summary metrics
- Family Cancer Report page showing hereditary risk patterns
- Health Care Measures page with personalized preventive suggestions
- Elix AI chatbot for health guidance
- Reminders and Notifications page

The UX uses a warm, trustworthy design with gradients, rounded cards, and clear visual hierarchy to make health information more approachable.

---

## Functional Workflow of the Application

1. User opens the web app.
2. User navigates to Test Conduct.
3. User uploads a CT scan or medical test data.
4. Frontend sends the request to backend Flask API.
5. Model analyses the image or tabular data.
6. Prediction result is returned to the UI.
7. The app shows a result with AI analysis summary.
8. The user can review dashboard trends, family risk, care measures, and reminders.

This creates a complete patient engagement workflow in a single platform.

---

## Screenshots and Visual Assets

The project includes visual outputs in the repository:
- Screenshots/Frontend Screenshots/
- Results and Accuracy/

These include:
- Dashboard page captures
- Home page design views
- Family inheritance page
- Reminder and notification page
- Test analysis pages
- Accuracy curve
- Loss curve
- ROC curve
- Confusion matrix

---

## Project Structure

```text
RH_Cancer_Prediction_System/
├── Backend/
│   ├── app.py
│   ├── model2.py
│   ├── train_lung_model.py
│   ├── lung_ct_model.keras
│   ├── breast_cancer_model_v2.pkl
│   └── scaler_v2.pkl
├── Datasets/
│   ├── Cancer_Data.csv
│   └── LungCT_Dataset/
├── Frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── README.md
├── Models/
│   ├── breast_cancer_model_v2.pkl
│   ├── lung_ct_model.h5
│   ├── lung_ct_model.keras
│   └── scaler_v2.pkl
├── Screenshots/
│   ├── Frontend Screenshots/
│   └── Results and Accuracy/
├── README.md
├── PROJECT_DETAILS.txt
└── ...
```

---

## How to Run the Project

### Backend Setup
```bash
cd Backend
pip install flask flask-cors tensorflow pillow joblib scikit-learn pandas numpy matplotlib
python app.py
```

The backend starts on localhost:5000.

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

The frontend runs through Vite and is accessible in the browser.

---

## Important Notes

- The backend and frontend are designed to run as separate services.
- The frontend uses localhost API calls to communicate with Flask.
- The app is ideal as a prototype / academic project / AI healthcare dashboard rather than a production hospital-grade system.
- The project demonstrates end-to-end ML inference and a polished healthcare UI.

---

## Resume / Portfolio Summary

This project showcases the design and development of an AI-driven cancer detection platform that combines medical imaging analysis, predictive analytics, and patient health management. I built a dual-model system capable of predicting lung cancer from CT scans and breast cancer from structured clinical features, then integrated the predictions into a modern healthcare dashboard with family risk analysis, personalized recommendations, reminder functionality, and an AI health assistant. The solution demonstrates end-to-end skills in Python, Flask, TensorFlow/Keras, scikit-learn, React, TypeScript, Vite, Tailwind CSS, and data visualization. It reflects a strong interest in healthcare AI, machine learning, full-stack integration, and human-centered product design.

---

## Future Enhancements

- Add real patient authentication and user profiles
- Integrate with actual EMR and healthcare APIs
- Support more cancer types and imaging modalities
- Add confidence scores and explainability for predictions
- Use secure and privacy-compliant data storage
- Improve chatbot with real LLM integration and medical data context
- Add PDF reports and export functionality
- Deploy to cloud services and dockerize the app

---

## Final Statement

Ribbon Haven is a comprehensive healthcare AI project that merges deep learning, predictive analytics, and customer-facing design into a practical cancer screening and prevention platform. It is an excellent example of how AI can support early detection, personalized recommendations, and proactive patient engagement in real-world wellness use cases.
