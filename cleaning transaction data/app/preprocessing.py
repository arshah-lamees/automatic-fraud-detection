"""
app/preprocessing.py
Contains all preprocessing logic for the Fraud Detection API.
- Cleans, encodes, and prepares transaction data for model prediction

"""

from app.schemas import TransactionInput
from typing import Dict, Any
import json
import os

# Load mapping.json at module level for efficiency
MAPPING_PATH = os.path.join(os.path.dirname(__file__), "../mapping.json")
with open(MAPPING_PATH, "r") as f:
    mapping = json.load(f)


def preprocess_transaction(input_data: TransactionInput) -> Dict[str, Any]:
    """
    Preprocess a single transaction input for model prediction.
    - Encodes categorical fields using mapping.json
    - Returns a dict of processed features in model input order
    """
    data = input_data.model_dump()
    # Encode categorical fields
    for col in ["use_chip", "merchant_city", "merchant_state"]:
        if col in mapping and col in data:
            data[col] = mapping[col].get(str(data[col]), -1)
    # Ensure all features are present and in correct type
    # (Model expects all features as numeric types)
    return data

# You can add more preprocessing functions here for batch processing, cleaning, etc.
# For now, this module focuses on single-transaction preprocessing for prediction. 