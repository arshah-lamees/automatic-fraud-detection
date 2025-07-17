"""
app/main.py
Main FastAPI application for Fraud Detection API with database integration and user authentication.
- /transaction: Store transaction in DB
- /predict/{transaction_id}: Predict fraud for stored transaction
- /register: Register a new user (user_auth)
- /login: User login/authentication (user_auth)
"""

from fastapi import FastAPI, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from app import models, schemas, crud, database, predict, preprocessing
from fastapi.middleware.cors import CORSMiddleware
# User auth imports (updated path)
from app.user_auth.u_database import SessionLocal as UserSessionLocal, engine as user_engine
from app.user_auth.u_models import Base as UserBase
from app.user_auth.u_schemas import UserCreate, UserLogin, UserOut
from app.user_auth.u_crud import create_user, authenticate_user, get_user_by_username, get_user_by_email, update_user_password
from app.user_auth.u_utils import create_access_token, verify_access_token

from pydantic import BaseModel

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    email: str
    new_password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

app = FastAPI(title="Fraud Detection API with DB and User Auth", version="2.0.0")

# Connect to frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://10.60.65.30:3000",
        "http://10.60.69.155:3000",
        "http://10.60.75.179:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create DB tables
models.Base.metadata.create_all(bind=database.engine)
# Create user table in users.db
UserBase.metadata.create_all(bind=user_engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_db():
    db = UserSessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(authorization: str = Header(None)):
    """
    Dependency to get the current user from the JWT token in the Authorization header.
    Raises 401 if token is missing or invalid.
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = authorization.split(" ", 1)[1]
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload

@app.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db=Depends(get_user_db)):
    if get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db, user)

@app.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db=Depends(get_user_db)):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    # Create JWT token with user id and username
    token_data = {"sub": db_user.username, "user_id": db_user.id}
    access_token = create_access_token(token_data)
    return {"access_token": access_token, "token_type": "bearer", "user": db_user}

@app.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db=Depends(get_user_db)):
    """
    Check if a user exists by email for password reset.
    """
    user = get_user_by_email(db, request.email)
    if user:
        return {"message": "User found. You can reset your password."}
    else:
        raise HTTPException(status_code=404, detail="User not found. Please register.")

@app.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db=Depends(get_user_db)):
    """
    Reset the user's password if the email exists.
    """
    user = update_user_password(db, request.email, request.new_password)
    if user:
        return {"message": "Password updated successfully. Please login with your new password."}
    else:
        raise HTTPException(status_code=404, detail="User not found. Please register.")

@app.post("/transaction", response_model=schemas.TransactionDB)
def create_transaction(transaction: schemas.TransactionInput, db: Session = Depends(get_db), user=Depends(get_current_user)):
    """
    Store a transaction in the database. Requires authentication.
    """
    return crud.create_transaction(db, transaction)

@app.get("/predict/{transaction_id}", response_model=schemas.PredictionResponse)
def predict_transaction(transaction_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    """
    Predict fraud for a stored transaction by ID. Requires authentication.
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