// Una sesión de mentira: en el TPO, "token" es el JWT que devuelve POST /auth/login (Clase 9).
const CLAVE = "token";

export function haySesion(): boolean {
  return localStorage.getItem(CLAVE) !== null;
}

export function iniciarSesion(email: string) {
  localStorage.setItem(CLAVE, `token-de-prueba-${email}`);
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE);
}
