from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import joblib
from PIL import Image

app = Flask(__name__)
CORS(app)

# =============================
# LOAD MODELS
# =============================

# Model 1 (Image - Lung CT)
lung_model = tf.keras.models.load_model("lung_ct_model.keras")

# Model 2 (Tabular - Breast Cancer)
rf_model = joblib.load("breast_cancer_model_v2.pkl")
scaler = joblib.load("scaler_v2.pkl")


# =============================
# ROUTE 1: IMAGE PREDICTION
# =============================
@app.route("/predict-lung", methods=["POST"])
def predict_lung():
    file = request.files["image"]

    img = Image.open(file).resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = lung_model.predict(img)
    class_index = np.argmax(prediction)

    return jsonify({
        "prediction": int(class_index)
    })


# =============================
# ROUTE 2: TABULAR PREDICTION
# =============================
@app.route("/predict-breast", methods=["POST"])
def predict_breast():
    data = request.json["features"]

    data = np.array(data).reshape(1, -1)
    data = scaler.transform(data)

    prediction = rf_model.predict(data)

    return jsonify({
        "prediction": int(prediction[0])
    })


# =============================
# RUN SERVER
# =============================
if __name__ == "__main__":
    app.run(debug=True)