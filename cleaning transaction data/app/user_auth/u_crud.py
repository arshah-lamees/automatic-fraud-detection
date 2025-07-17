"""
user_auth/u_crud.py
CRUD operations for User model.
"""

from sqlalchemy.orm import Session
from .u_models import User
from .u_schemas import UserCreate
from .u_utils import hash_password, verify_password

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user_in: UserCreate):
    hashed_pw = hash_password(user_in.password)
    db_user = User(username=user_in.username, email=user_in.email, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    # Use the value from the user instance, not the column definition
    if not verify_password(password, user.hashed_password):  # type: ignore
        return None
    return user

def update_user_password(db: Session, email: str, new_password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    setattr(user, 'hashed_password', hash_password(new_password))
    db.commit()
    db.refresh(user)
    return user