import request from "supertest";
import { app } from "../app";

describe("POST /eco", () => {
  it("devuelve el mismo texto recibido", async () => {
    const res = await request(app).post("/eco").send({ texto: "hola" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ recibido: "hola" });
  });

  it("responde 400 si no se manda texto", async () => {
    const res = await request(app).post("/eco").send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
