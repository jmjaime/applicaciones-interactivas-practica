import request from "supertest";
import { createApp } from "../src/app";

describe("Ejercicio 02 - Parámetros, paginación y filtros (debes implementar)", () => {
  const app = createApp();

  it("GET /api/courses?page=&limit=&sort= debe soportar paginación (stub 501)", async () => {
    const res = await request(app)
      .get("/api/courses?page=2&limit=10&sort=title,-createdAt")
      .expect(501);
    expect(res.body).toHaveProperty("items");
    expect(res.body).toHaveProperty("page");
    expect(res.body).toHaveProperty("limit");
    expect(res.body).toHaveProperty("total");
  });

  it("GET /api/courses?level=&instructorId=&topics= debe filtrar (stub 501)", async () => {
    const res = await request(app)
      .get("/api/courses?level=beginner&instructorId=inst_demo&topics=api,http")
      .expect(501);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});
