"""
app/main.py
Main FastAPI application for Fraud Detection API with database integration.
- /transaction: Store transaction in DB
- /predict/{transaction_id}: Predict fraud for stored transaction
"""

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, crud, database, predict, preprocessing
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Fraud Detection API with DB", version="2.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://10.60.69.155:3000",  # Your frontend's actual address
        "http://localhost:3000",     # (Optional) For local testing
        "http://127.0.0.1:3000"      # (Optional) For local testing
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/transaction", response_model=schemas.TransactionDB)
def create_transaction(transaction: schemas.TransactionInput, db: Session = Depends(get_db)):
    """
    Store a transaction in the database.
    """
    return crud.create_transaction(db, transaction)

@app.get("/predict/{transaction_id}", response_model=schemas.PredictionResponse)
def predict_transaction(transaction_id: int, db: Session = Depends(get_db)):
    """
    Predict fraud for a stored transaction by ID.
    """
    db_transaction = crud.get_transaction(db, transaction_id)
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    # Convert SQLAlchemy object to dict for preprocessing
    transaction_dict = {col: getattr(db_transaction, col) for col in schemas.TransactionInput.model_fields}
    processed = preprocessing.preprocess_transaction(schemas.TransactionInput(**transaction_dict))
    ml_model = predict.get_model()
    is_fraud = predict.predict_fraud(ml_model, processed)
    return schemas.PredictionResponse(is_fraud=is_fraud) 