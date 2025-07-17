"""
app/schemas.py
Defines all Pydantic models, Enums, and type hints for the Fraud Detection API.
- Ensures strict validation and type safety
"""

from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional

class UseChipEnum(str, Enum):
    """
    Enum for transaction type (use_chip field).
    """
    swipe = "Swipe Transaction"
    chip = "Chip Transaction"

class TransactionInput(BaseModel):
    """
    Pydantic model for a single transaction input.
    """
    client_id: int = Field(..., examples=[123])
    card_id: int = Field(..., examples=[4567])
    amount: float = Field(..., examples=[100.50])
    use_chip: UseChipEnum = Field(..., description="Type of transaction (chip/swipe)", examples=["Swipe Transaction"])
    merchant_id: int = Field(..., examples=[7890])
    merchant_city: str = Field(..., examples=["Orlando"])
    merchant_state: str = Field(..., examples=["FL"])
    zip: float = Field(..., examples=[32804])
    mcc: int = Field(..., examples=[7538])
    hour: int = Field(..., ge=0, le=23, examples=[14])
    dayofweek: int = Field(..., ge=0, le=6, examples=[2])
    is_weekend: int = Field(..., ge=0, le=1, examples=[0])
    bad_cvv: int = Field(..., ge=0, le=1, examples=[0])
    bad_card_number: int = Field(..., ge=0, le=1, examples=[0])
    bad_pin: int = Field(..., ge=0, le=1, examples=[0])
    bad_zipcode: int = Field(..., ge=0, le=1, examples=[0])
    insufficient_balance: int = Field(..., ge=0, le=1, examples=[0])
    technical_glitch: int = Field(..., ge=0, le=1, examples=[0])

    # model_config = {
    #     "json_schema_extra": {
    #         "examples": [
    #             {
    #                 "client_id": 123,
    #                 "card_id": 4567,
    #                 "amount": 100.50,
    #                 "use_chip": "Swipe Transaction",
    #                 "merchant_id": 7890,
    #                 "merchant_city": "Orlando",
    #                 "merchant_state": "FL",
    #                 "zip": 32804,
    #                 "mcc": 7538,
    #                 "hour": 14,
    #                 "dayofweek": 2,
    #                 "is_weekend": 0,
    #                 "bad_cvv": 0,
    #                 "bad_card_number": 0,
    #                 "bad_pin": 0,
    #                 "bad_zipcode": 0,
    #                 "insufficient_balance": 0,
    #                 "technical_glitch": 0
    #             }
    #         ]
    #     }
    # }

class TransactionDB(TransactionInput):#Used when returning data from the database
    id: int

class PredictionResponse(BaseModel):
    """
    Pydantic model for prediction response.
    """
    is_fraud: int = Field(..., description="1 if fraud, 0 otherwise", examples=[0])

class HealthStatus(BaseModel):
    """
    Pydantic model for health check endpoint.
    """
    status: str = Field(..., examples=["ok"]) 