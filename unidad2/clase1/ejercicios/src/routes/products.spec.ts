import request from "supertest";
import { createApp } from "../app";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Server } from "node:http";


describe("/products endpoints", () => {

  let app: Server;
  beforeAll(async () => {
    app = createApp().listen(0);
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /products should return 200 and an array", async () => {
    const res = await request(app).get("/products").expect(200);
    assert.equal(Array.isArray(res.body), true);
  });

  it("GET /products?name=mouse should filter by name (case-insensitive)", async () => {
    const res = await request(app)
      .get("/products")
      .query({ name: "MouSe" })
      .expect(200);
    assert.equal(
      res.body.every((p: any) =>
        String(p.name).toLowerCase().includes("mouse")
      ),
      true
    );
  });

  it("POST /products should validate body", async () => {
    await request(app).post("/products").send({}).expect(400);
  });

  it("POST /products then DELETE /products/:id should return 204", async () => {
    const create = await request(app)
      .post("/products")
      .send({ name: "Prod X", price: 9.99, category: "misc" })
      .expect(201);
    const id = create.body.id;
    await request(app).delete(`/products/${id}`).expect(204);
  });
});
