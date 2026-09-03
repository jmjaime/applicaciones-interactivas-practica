import request from "supertest";
import { app } from "../app";

describe("GET /authors", () => {
  it("devuelve todos los authors sin filtro", async () => {
    const res = await request(app).get("/authors");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  });

  it("filtra por nationality cuando viene el query param", async () => {
    const res = await request(app).get("/authors?nationality=Argentina");
    expect(res.status).toBe(200);
    expect(
      res.body.every((a: { nationality: string }) => a.nationality === "Argentina"),
    ).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("devuelve un array vacío si ningún author tiene esa nationality", async () => {
    const res = await request(app).get("/authors?nationality=Perú");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe("GET /authors/:id", () => {
  it("devuelve el author cuando existe", async () => {
    const res = await request(app).get("/authors/1");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Jorge Luis Borges");
  });

  it("responde 404 si no existe", async () => {
    const res = await request(app).get("/authors/999");
    expect(res.status).toBe(404);
  });
});

describe("POST /authors", () => {
  it("crea un author y lo devuelve con 201", async () => {
    const res = await request(app)
      .post("/authors")
      .send({ name: "Julio Cortázar", nationality: "Argentina" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("Julio Cortázar");

    const detalle = await request(app).get(`/authors/${res.body.id}`);
    expect(detalle.status).toBe(200);
  });

  it("responde 400 si falta name o nationality", async () => {
    const res = await request(app).post("/authors").send({ name: "Sin nacionalidad" });
    expect(res.status).toBe(400);
  });
});
