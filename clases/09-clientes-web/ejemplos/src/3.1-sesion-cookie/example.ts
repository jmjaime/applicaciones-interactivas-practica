import { randomBytes } from "node:crypto";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { sellers } from "../data";
import { HttpError } from "../errors";

export const sesionRouter = Router();

// El estado de la sesión vive EN EL SERVIDOR (acá, en memoria del proceso).
// La cookie solo lleva un id al azar, sin datos.
const sessions = new Map<string, { sellerId: string }>();

// Parseo mínimo del header Cookie, a mano para que se vea que no hay magia:
// "sid=abc123; theme=dark" → { sid: "abc123", theme: "dark" }
function readCookie(header: string | undefined, name: string) {
  const pair = header?.split(";").map((c) => c.trim().split("=")).find(([k]) => k === name);
  return pair?.[1];
}

sesionRouter.post("/session/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  const seller = sellers.find((s) => s.email === email);
  if (!seller || !(await bcrypt.compare(password ?? "", seller.passwordHash))) {
    throw new HttpError(401, "Credenciales inválidas");
  }
  const sid = randomBytes(16).toString("hex");
  sessions.set(sid, { sellerId: seller.id });

  res.setHeader("Set-Cookie", `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=7200`);
  res.json({ ok: true });
});

sesionRouter.get("/session/me", (req, res) => {
  const sid = readCookie(req.headers.cookie, "sid");
  const session = sid ? sessions.get(sid) : undefined;
  if (!session) throw new HttpError(401, "Sin sesión");

  const seller = sellers.find((s) => s.id === session.sellerId)!;
  res.json({ id: seller.id, fullName: seller.fullName, activeSessions: sessions.size });
});

// Logout real e inmediato: se borra la entrada del servidor. Con JWT (3.2)
// no hay nada que borrar del lado del servidor.
sesionRouter.post("/session/logout", (req, res) => {
  const sid = readCookie(req.headers.cookie, "sid");
  if (sid) sessions.delete(sid);
  res.setHeader("Set-Cookie", "sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0");
  res.status(204).end();
});

// 🔧 Probá vos: loguearse, guardar el archivo (ts-node-dev reinicia el
// proceso) y volver a pedir /session/me. El Map se vació: la sesión murió
// con el proceso, igual que si la request cayera en otra instancia detrás
// de un load balancer.
