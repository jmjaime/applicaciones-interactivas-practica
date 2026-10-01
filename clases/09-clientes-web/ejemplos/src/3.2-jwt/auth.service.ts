import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { agencies, newId, refreshTokens, sellers } from "../data";
import { HttpError } from "../errors";

export const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  agency: { name: string; contactPhone: string };
}

export function jwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Falta JWT_SECRET en .env (ver .env.example)");
  return secret;
}

export async function register(dto: RegisterDto) {
  if (sellers.some((s) => s.email === dto.email)) {
    throw new HttpError(409, "El email ya está registrado");
  }
  if (agencies.some((a) => a.name === dto.agency.name)) {
    throw new HttpError(409, "El nombre de fantasía ya existe");
  }
  const passwordHash = await bcrypt.hash(dto.password, 10);
  const seller = { id: newId(), fullName: dto.fullName, email: dto.email, passwordHash };
  sellers.push(seller);
  // Mismo paso: Vendedor + Inmobiliaria (tpo.md § Usuarios).
  const agency = { id: newId(), ...dto.agency, sellerId: seller.id };
  agencies.push(agency);

  // Nunca se devuelve el passwordHash.
  return { id: seller.id, email: seller.email, agencyId: agency.id };
}

export async function login(email: string, password: string) {
  const seller = sellers.find((s) => s.email === email);
  const ok = seller && (await bcrypt.compare(password, seller.passwordHash));
  // Mismo mensaje para "no existe" y "password incorrecto".
  if (!ok) throw new HttpError(401, "Credenciales inválidas");

  // Dos tokens: el access (JWT corto, va en cada request) y el refresh
  // (largo, solo sirve para pedir un access nuevo).
  return { token: signAccess(seller.id), refreshToken: createRefresh(seller.id) };
}

function signAccess(sellerId: string) {
  const expiresIn = (process.env.JWT_EXPIRES_IN ?? "15m") as SignOptions["expiresIn"];
  return jwt.sign({ sub: sellerId }, jwtSecret(), { expiresIn });
}

// El refresh se GUARDA (en el TPO sería una tabla): por eso se puede revocar.
function createRefresh(sellerId: string) {
  const token = randomUUID();
  refreshTokens.push({ token, sellerId, expiresAt: new Date(Date.now() + REFRESH_TTL_MS) });
  return token;
}

export function refresh(refreshToken: string) {
  const stored = refreshTokens.find((r) => r.token === refreshToken);
  if (!stored || stored.expiresAt < new Date()) {
    throw new HttpError(401, "Refresh token inválido o vencido: hay que loguearse de nuevo");
  }
  return { token: signAccess(stored.sellerId) };
}

// Logout = borrar el refresh. El access que ya se emitió sigue valiendo
// hasta su exp: por eso conviene que sea corto.
export function logout(refreshToken: string) {
  const i = refreshTokens.findIndex((r) => r.token === refreshToken);
  if (i >= 0) refreshTokens.splice(i, 1);
}
