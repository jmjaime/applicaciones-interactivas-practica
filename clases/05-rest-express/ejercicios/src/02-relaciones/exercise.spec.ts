import request from "supertest";
import { app } from "../app";

describe("GET /collections/:id/books", () => {
  it("devuelve los books de la collection", async () => {
    const res = await request(app).get("/collections/1/books");
    expect(res.status).toBe(200);
    expect(res.body.map((b: { id: number }) => b.id).sort()).toEqual([1, 4]);
  });

  it("responde 404 si la collection no existe", async () => {
    const res = await request(app).get("/collections/999/books");
    expect(res.status).toBe(404);
  });
});

describe("GET /books", () => {
  it("filtra por collectionId — mismo resultado que la ruta anidada", async () => {
    const res = await request(app).get("/books?collectionId=1");
    expect(res.status).toBe(200);
    expect(res.body.map((b: { id: number }) => b.id).sort()).toEqual([1, 4]);
  });

  it("devuelve todos los books sin el query param", async () => {
    const res = await request(app).get("/books");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(4);
  });

  it("responde 404 si la collection no existe", async () => {
    const res = await request(app).get("/books?collectionId=999");
    expect(res.status).toBe(404);
  });
});

describe("POST /collections/:id/books", () => {
  it("agrega un book existente a la collection", async () => {
    const res = await request(app).post("/collections/1/books").send({ bookId: 3 });
    expect(res.status).toBe(201);

    const detalle = await request(app).get("/collections/1/books");
    expect(detalle.body.some((b: { id: number }) => b.id === 3)).toBe(true);
  });

  it("responde 404 si el book no existe", async () => {
    const res = await request(app).post("/collections/1/books").send({ bookId: 999 });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /collections/:id/books/:bookId", () => {
  it("saca el book de la collection y responde 204", async () => {
    const res = await request(app).delete("/collections/1/books/1");
    expect(res.status).toBe(204);

    const detalle = await request(app).get("/collections/1/books");
    expect(detalle.body.some((b: { id: number }) => b.id === 1)).toBe(false);
  });

  it("responde 404 si la collection no existe", async () => {
    const res = await request(app).delete("/collections/999/books/1");
    expect(res.status).toBe(404);
  });
});
