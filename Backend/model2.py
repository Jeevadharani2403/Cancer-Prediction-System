import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# Load dataset
data = pd.read_csv("Cancer_Data.csv")

# Drop ID column
data = data.drop("id", axis=1)

# Convert diagnosis to numeric
# M = 1 (Malignant)
# B = 0 (Benign)
data["diagnosis"] = data["diagnosis"].map({"M": 1, "B": 0})

# Separate features and target
X = data.drop("diagnosis", axis=1)
y = data["diagnosis"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save
joblib.dump(model, "breast_cancer_model_v2.pkl")
joblib.dump(scaler, "scaler_v2.pkl")

print("Model trained and saved successfully!")