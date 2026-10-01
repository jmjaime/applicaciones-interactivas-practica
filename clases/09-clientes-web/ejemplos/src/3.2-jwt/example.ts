import { Response, Router } from "express";
import { agencies, sellers } from "../data";
import { HttpError } from "../errors";
import * as agencyService from "./agency.service";
import * as authService from "./auth.service";
import { requireAuth } from "./requireAuth";

export const jwtRouter = Router();

jwtRouter.post("/auth/register", async (req, res) => {
  const { fullName, email, password, agency } = req.body ?? {};
  if (!fullName || !email || !password || !agency?.name || !agency?.contactPhone) {
    throw new HttpError(400, "fullName, email, password y agency { name, contactPhone } son obligatorios");
  }
  res.status(201).json(await authService.register({ fullName, email, password, agency }));
});

// Mismo parseo mínimo del header Cookie que en 3.1.
function readCookie(header: string | undefined, name: string) {
  const pair = header?.split(";").map((c) => c.trim().split("=")).find(([k]) => k === name);
  return pair?.[1];
}

// El refresh viaja en cookie HttpOnly (JS no lo lee) y solo hacia /auth.
function setRefreshCookie(res: Response, value: string, maxAgeSeconds: number) {
  res.setHeader(
    "Set-Cookie",
    `refresh=${value}; HttpOnly; SameSite=Lax; Path=/auth; Max-Age=${maxAgeSeconds}`,
  );
}

jwtRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  const { token, refreshToken } = await authService.login(email ?? "", password ?? "");
  setRefreshCookie(res, refreshToken, authService.REFRESH_TTL_MS / 1000);
  res.json({ token }); // el access va en el body: el front lo manda en Authorization
});

jwtRouter.post("/auth/refresh", (req, res) => {
  const refreshToken = readCookie(req.headers.cookie, "refresh");
  if (!refreshToken) throw new HttpError(401, "Falta el refresh token");
  res.json(authService.refresh(refreshToken));
});

jwtRouter.post("/auth/logout", (req, res) => {
  const refreshToken = readCookie(req.headers.cookie, "refresh");
  if (refreshToken) authService.logout(refreshToken);
  setRefreshCookie(res, "", 0);
  res.status(204).end();
});

jwtRouter.get("/auth/me", requireAuth, (req, res) => {
  const seller = sellers.find((s) => s.id === req.sellerId);
  if (!seller) throw new HttpError(401, "El vendedor del token ya no existe");
  res.json({ id: seller.id, fullName: seller.fullName, email: seller.email });
});

// Pública: perfil de la inmobiliaria para el Interesado (sin token).
jwtRouter.get("/agencies/:id", (req, res) => {
  const agency = agencies.find((a) => a.id === req.params.id);
  if (!agency) throw new HttpError(404, "Inmobiliaria inexistente");
  res.json(agency);
});

// Protegida: solo el dueño la edita.
jwtRouter.put("/agencies/:id", requireAuth, (req, res) => {
  res.json(agencyService.update(String(req.params.id), req.sellerId!, req.body ?? {}));
});

// 🔧 Probá vos: agregar `agencyId` al payload en auth.service.ts
// (jwt.sign({ sub, agencyId }, ...)), decodificar el token nuevo en jwt.io
// y pensar qué pasa con los tokens ya emitidos si el vendedor cambiara de
// inmobiliaria.
