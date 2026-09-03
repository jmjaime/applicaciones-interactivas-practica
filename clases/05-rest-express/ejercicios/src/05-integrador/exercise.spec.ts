import request from "supertest";
import { app } from "../app";
import "./document"; // registra PATCH /authors/{id} en el registry de 04
import { buildOpenApiDocument } from "../04-openapi/document";

describe("DELETE /authors/:id", () => {
  it("borra el author y responde 204", async () => {
    const res = await request(app).delete("/authors/2");
    expect(res.status).toBe(204);

    const detalle = await request(app).get("/authors/2");
    expect(detalle.status).toBe(404);
  });

  it("responde 404 si no existe", async () => {
    const res = await request(app).delete("/authors/999");
    expect(res.status).toBe(404);
  });
});

describe("PATCH /authors/:id", () => {
  it("actualiza solo los campos que vienen en el body", async () => {
    const res = await request(app).patch("/authors/1").send({ nationality: "España" });

    expect(res.status).toBe(200);
    expect(res.body.nationality).toBe("España");
    expect(res.body.name).toBe("Jorge Luis Borges");
  });

  it("responde 404 si no existe", async () => {
    const res = await request(app).patch("/authors/999").send({ nationality: "España" });
    expect(res.status).toBe(404);
  });

  it("responde 400 si el body tiene un campo con tipo inválido", async () => {
    const res = await request(app).patch("/authors/1").send({ nationality: 123 });
    expect(res.status).toBe(400);
  });
});

describe("middleware de logging", () => {
  it("loggea cada request", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation();
    await request(app).get("/authors");
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});

describe("documentación OpenAPI", () => {
  it("registra PATCH /authors/{id}", () => {
    const doc = buildOpenApiDocument();
    expect(doc.paths["/authors/{id}"]).toBeDefined();
  });

  it("GET /docs sirve la documentación", async () => {
    const res = await request(app).get("/docs/");
    expect(res.status).toBe(200);
  });
});
