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
    zip = Column(Float)
    mcc = Column(Integer)
    hour = Column(Integer)
    dayofweek = Column(Integer)
    is_weekend = Column(Integer)
    error_0 = Column(Integer)
    error_1 = Column(Integer)
    error_2 = Column(Integer)
    error_3 = Column(Integer)
    error_4 = Column(Integer)
    error_5 = Column(Integer) 