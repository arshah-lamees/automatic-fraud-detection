"""
app/crud.py
CRUD operations for Transaction model.
"""

from sqlalchemy.orm import Session
from app.models import Transaction
from app.schemas import TransactionInput

# Create a new transaction in the database
def create_transaction(db: Session, transaction: TransactionInput) -> Transaction:
    db_transaction = Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

# Get a transaction by ID
def get_transaction(db: Session, transaction_id: int) -> Transaction | None:
    return db.query(Transaction).filter(Transaction.id == transaction_id).first() 