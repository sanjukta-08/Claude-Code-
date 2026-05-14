from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    hub_internal_secret: str = "change-me"
    hub_port: int = 8000
    tier1_threshold: int = 70
    tier2_threshold: int = 40


settings = Settings()
