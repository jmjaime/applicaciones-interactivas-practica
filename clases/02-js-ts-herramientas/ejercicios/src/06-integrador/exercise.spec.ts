import request from "supertest";
import { app } from "../app";

describe("POST /tareas (integrador)", () => {
  it("crea la tarea y después se puede buscar por id", async () => {
    const creada = await request(app)
      .post("/tareas")
      .send({ titulo: "Nueva tarea", prioridad: "alta" });

    expect(creada.status).toBe(201);
    expect(creada.body.titulo).toBe("Nueva tarea");
    expect(creada.body.id).toBeDefined();

    const buscada = await request(app).get(`/tareas/${creada.body.id}/detalle`);
    expect(buscada.status).toBe(200);
    expect(buscada.body.titulo).toBe("Nueva tarea");
    expect(buscada.body.estado).toBe("pendiente");
  });

  it("responde 400 si falta el titulo", async () => {
    const res = await request(app).post("/tareas").send({ prioridad: "alta" });
    expect(res.status).toBe(400);
  });
});
