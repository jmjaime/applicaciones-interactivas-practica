import request from "supertest";
import { app } from "../app";

describe.each([
  ["manual", "/comentarios-manual"],
  ["zod", "/comentarios-zod"],
])("POST %s", (_nombre, ruta) => {
  it("crea el comentario si autor y contenido son válidos", async () => {
    const res = await request(app)
      .post(ruta)
      .send({ autor: "Ada", contenido: "Muy útil la clase" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ autor: "Ada", contenido: "Muy útil la clase" });
  });

  it("responde 400 si falta autor", async () => {
    const res = await request(app).post(ruta).send({ contenido: "hola" });
    expect(res.status).toBe(400);
  });

  it("responde 400 si contenido supera los 280 caracteres", async () => {
    const res = await request(app)
      .post(ruta)
      .send({ autor: "Ada", contenido: "a".repeat(281) });
    expect(res.status).toBe(400);
  });
});
