import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { iniciarSesion } from "./sesion";

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const desde: string = state?.desde ?? "/panel";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    // Sin backend: cualquier email y contraseña sirven.
    iniciarSesion(String(datos.get("email")));
    navigate(desde, { replace: true });
  }

  return (
    <form className="formulario angosto" onSubmit={handleSubmit}>
      <h2>Ingresar como vendedor</h2>
      {state?.desde && <p className="aviso">Para ver {state.desde} hay que iniciar sesión.</p>}
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Contraseña
        <input name="password" type="password" required />
      </label>
      <button type="submit" className="boton primario">
        Ingresar
      </button>
    </form>
  );
}
