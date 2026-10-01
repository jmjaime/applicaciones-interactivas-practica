import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

// Mismos nombres que las entidades del template del TPO (Seller, Agency,
// Property, Comment), pero en memoria: el foco de la clase es la
// arquitectura y la autenticación, no TypeORM.
export interface Seller {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
}

export interface Agency {
  id: string;
  name: string;
  contactPhone: string;
  sellerId: string;
}

export interface Comment {
  id: string;
  propertyId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}

export interface Activity {
  id: string;
  type: "COMMENT";
  sourceId: string;
  read: boolean;
  createdAt: Date;
}

// Refresh token (3.2): opaco (no es un JWT) y guardado en el servidor, para
// poder revocarlo en el logout.
export interface RefreshToken {
  token: string;
  sellerId: string;
  expiresAt: Date;
}

export const refreshTokens: RefreshToken[] = [];
export const sellers: Seller[] = [];
export const agencies: Agency[] = [];
export const comments: Comment[] = [];
export const activities: Activity[] = [];

// Dos vendedores fijos (ids constantes) para que un token emitido antes de
// reiniciar el server siga apuntando a alguien que existe (demo 3.2, paso 6).
// Password de ambos: "123456".
const passwordHash = bcrypt.hashSync("123456", 10);

sellers.push(
  { id: "11111111-1111-4111-8111-111111111111", fullName: "Ana Norte", email: "ana@demo.com", passwordHash },
  { id: "22222222-2222-4222-8222-222222222222", fullName: "Bruno Sur", email: "bruno@demo.com", passwordHash },
);

agencies.push(
  { id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", name: "Inmobiliaria Norte", contactPhone: "11-4000-1111", sellerId: sellers[0].id },
  { id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", name: "Propiedades Sur", contactPhone: "11-4000-2222", sellerId: sellers[1].id },
);

export const newId = () => randomUUID();
