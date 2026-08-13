import request from "supertest";
import { app } from "../app";

describe("GET /tareas", () => {
  it("filtra por prioridad cuando viene el query param", async () => {
    const res = await request(app).get("/tareas?prioridad=alta");

    expect(res.status).toBe(200);
    expect(res.body.every((t: { prioridad: string }) => t.prioridad === "alta")).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("devuelve todas si no viene el query param", async () => {
    const res = await request(app).get("/tareas");
    expect(res.body.length).toBe(3);
  });
});

describe("GET /tareas/:id/detalle", () => {
  it("devuelve solo titulo y estado", async () => {
    const res = await request(app).get("/tareas/1/detalle");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ titulo: "Preparar el TPO", estado: "pendiente" });
  });

  it("responde 404 si no existe", async () => {
    const res = await request(app).get("/tareas/999/detalle");
    expect(res.status).toBe(404);
  });
});

describe("DELETE /tareas/:id", () => {
  it("borra la tarea y después no se encuentra más", async () => {
    const borrado = await request(app).delete("/tareas/2");
    expect(borrado.status).toBe(204);

    const detalle = await request(app).get("/tareas/2/detalle");
    expect(detalle.status).toBe(404);
  });

  it("responde 404 si no existe", async () => {
    const res = await request(app).delete("/tareas/999");
    expect(res.status).toBe(404);
  });
});
