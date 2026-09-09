import "reflect-metadata";
import request from "supertest";
import { createApp } from "../src/app";
import { initializeDatabase, closeDatabase, AppDataSource } from "../src/db/data-source";
import { Propiedad, EstadoPropiedad } from "../src/entities/Propiedad";
import { crearInmobiliaria, propiedadValida } from "./helpers";

describe("Controller (end-to-end vía HTTP)", () => {
  const app = createApp();
  let inmobiliariaId: number;

  beforeAll(async () => {
    await initializeDatabase("app");
    const inmobiliaria = await crearInmobiliaria();
    inmobiliariaId = inmobiliaria.id;
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("POST /api/propiedades rechaza un body inválido con 400", async () => {
    const res = await request(app)
      .post("/api/propiedades")
      .send({ ...propiedadValida(inmobiliariaId), titulo: "", precio: -100 })
      .expect(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("POST /api/propiedades crea la propiedad (201 + Location)", async () => {
    const res = await request(app)
      .post("/api/propiedades")
      .send(propiedadValida(inmobiliariaId))
      .expect(201);
    expect(res.headers.location).toBe(`/api/propiedades/${res.body.id}`);
  });

  it("GET /api/propiedades/:id devuelve la propiedad creada, y 404 si no existe", async () => {
    const created = await request(app)
      .post("/api/propiedades")
      .send(propiedadValida(inmobiliariaId));
    await request(app).get(`/api/propiedades/${created.body.id}`).expect(200);
    await request(app).get("/api/propiedades/999999").expect(404);
  });

  it("PATCH /api/propiedades/:id actualiza, y devuelve 409 si ya no es editable", async () => {
    const created = await request(app)
      .post("/api/propiedades")
      .send(propiedadValida(inmobiliariaId));

    await request(app)
      .patch(`/api/propiedades/${created.body.id}`)
      .send({ precio: 130000 })
      .expect(200);

    await AppDataSource.getRepository(Propiedad).update(created.body.id, {
      estado: EstadoPropiedad.VENDIDA,
    });
    const res = await request(app)
      .patch(`/api/propiedades/${created.body.id}`)
      .send({ precio: 999 })
      .expect(409);
    expect(res.body.error.code).toBe("CONFLICT");
  });

  it("DELETE /api/propiedades/:id borra la propiedad", async () => {
    const created = await request(app)
      .post("/api/propiedades")
      .send(propiedadValida(inmobiliariaId));
    await request(app).delete(`/api/propiedades/${created.body.id}`).expect(204);
    await request(app).get(`/api/propiedades/${created.body.id}`).expect(404);
  });

  it("GET /api/propiedades pagina con page/limit (default 1/10)", async () => {
    for (let i = 0; i < 12; i++) {
      await request(app).post("/api/propiedades").send(propiedadValida(inmobiliariaId));
    }
    const res = await request(app).get("/api/propiedades").expect(200);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(10);
    expect(res.body.items).toHaveLength(10);
    expect(res.body.total).toBeGreaterThanOrEqual(12);
  });
});
