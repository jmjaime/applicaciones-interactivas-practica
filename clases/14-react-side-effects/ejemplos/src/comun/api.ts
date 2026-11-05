// La URL base sale de una variable de entorno, igual que en el TPO (ver .env.example).
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
