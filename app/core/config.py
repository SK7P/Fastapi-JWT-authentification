# app/core/config.py

from pydantic_settings import BaseSettings
from pydantic import EmailStr

class Settings(BaseSettings):
    PROJECT_NAME: str = "Time Manager"
    DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
