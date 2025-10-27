from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, users
from app.db.base import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Pointeuse API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ton front React
    allow_credentials=True,                   # autorise les cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
