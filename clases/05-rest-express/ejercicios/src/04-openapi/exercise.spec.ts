import request from "supertest";
import { app } from "../app";
import { buildOpenApiDocument } from "./document";

describe("POST /collections", () => {
  it("crea una collection con name válido", async () => {
    const res = await request(app).post("/collections").send({ name: "Ciencia ficción" });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Ciencia ficción");
    expect(res.body.bookIds).toEqual([]);
  });

  it("responde 400 si falta name", async () => {
    const res = await request(app).post("/collections").send({});
    expect(res.status).toBe(400);
  });

  it("responde 400 si name es un string vacío", async () => {
    const res = await request(app).post("/collections").send({ name: "" });
    expect(res.status).toBe(400);
  });
});

describe("documentación OpenAPI", () => {
  it("registra POST /collections", () => {
    const doc = buildOpenApiDocument();
    expect(doc.paths["/collections"]).toBeDefined();
  });

  it("GET /docs sirve la documentación", async () => {
    const res = await request(app).get("/docs/");
    expect(res.status).toBe(200);
  });
});
