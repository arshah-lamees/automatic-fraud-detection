"""
app/predict.py
Handles model loading and prediction logic for the Fraud Detection API.
- Loads the trained model from disk
- Provides a function to predict fraud for a processed transaction

"""
import numpy as np
import os
import joblib
from typing import Any, Dict

# Path to the trained model file
MODEL_PATH = os.path.join(os.path.dirname(__file__), "../rf_model.pkl")

# Load the model at module level for efficiency
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    model = None
    print(f"[ERROR] Could not load model: {e}")

def get_model():
    """
    Returns the loaded model instance.
    Raises an exception if the model is not loaded.
    """
    if model is None:
        raise RuntimeError("Model is not loaded. Check MODEL_PATH and model file.")
    return model


def predict_fraud(model: Any, features: Dict[str, Any]) -> int:
    """
    Predicts if a transaction is fraudulent.
    Args:
        model: Trained model instance (e.g., RandomForestClassifier)
        features: Dict of processed features (all numeric)
    Returns:
        1 if fraud, 0 otherwise
    """

    # Ensure the features are in the correct order expected by the model
    X = np.array([list(features.values())])
    pred = model.predict(X)[0]
    return int(pred) 