"""
app/models.py
Defines SQLAlchemy ORM models for the database.
"""

from sqlalchemy import Column, Integer, Float, String
from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer)
    card_id = Column(Integer)
    amount = Column(Float)
    use_chip = Column(String)
    merchant_id = Column(Integer)
    merchant_city = Column(String)
    merchant_state = Column(String)
    zip = Column(Integer)
    mcc = Column(Integer)
    hour = Column(Integer)
    dayofweek = Column(Integer)
    is_weekend = Column(Integer)
    bad_cvv = Column(Integer)
    bad_card_number = Column(Integer)
    bad_pin = Column(Integer)
    bad_zipcode = Column(Integer)
    insufficient_balance = Column(Integer)
    technical_glitch = Column(Integer) 