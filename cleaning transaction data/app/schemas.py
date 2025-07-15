"""
app/schemas.py
Defines all Pydantic models, Enums, and type hints for the Fraud Detection API.
- Ensures strict validation and type safety
- Ready for future database and frontend integration
"""

from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional

class UseChipEnum(str, Enum):
    """
    Enum for transaction type (use_chip field).
    Extend this as needed for more transaction types.
    """
    swipe = "Swipe Transaction"
    chip = "Chip Transaction"

class TransactionInput(BaseModel):
    """
    Pydantic model for a single transaction input.
    All fields are strictly typed and validated.
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
    error_0: int = Field(..., ge=0, le=1, examples=[0])
    error_1: int = Field(..., ge=0, le=1, examples=[0])
    error_2: int = Field(..., ge=0, le=1, examples=[0])
    error_3: int = Field(..., ge=0, le=1, examples=[0])
    error_4: int = Field(..., ge=0, le=1, examples=[0])
    error_5: int = Field(..., ge=0, le=1, examples=[0])

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
    #                 "error_0": 0,
    #                 "error_1": 0,
    #                 "error_2": 0,
    #                 "error_3": 0,
    #                 "error_4": 0,
    #                 "error_5": 0
    #             }
    #         ]
    #     }
    # }

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