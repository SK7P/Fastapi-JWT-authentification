# app/api/users.py
from fastapi import APIRouter, Depends, HTTPException, Request
from app.core.security import decode_access_token
from app.db.base import SessionLocal
from app.db import models

router = APIRouter(prefix="/users", tags=["users"])

def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = payload.get("sub")
    db = SessionLocal()
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@router.get("/me")
def get_me(current_user: models.User = Depends(get_current_user)):
    return {"email": current_user.email, "id": current_user.id}
