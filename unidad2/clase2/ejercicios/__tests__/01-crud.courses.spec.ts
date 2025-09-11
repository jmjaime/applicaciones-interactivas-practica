import request from "supertest";
import { createApp } from "../src/app";

describe("Ejercicio 01 - CRUD de courses (debes implementar)", () => {
  const app = createApp();

  it("GET /api/courses debe listar (stub 501)", async () => {
    const res = await request(app).get("/api/courses").expect(501);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it("POST /api/courses crea curso (stub 501)", async () => {
    const res = await request(app)
      .post("/api/courses")
      .send({ title: "Intro a APIs", level: "beginner" })
      .set("Content-Type", "application/json")
      .expect(501);
    expect(typeof res.body.id).toBe("string");
  });
});
