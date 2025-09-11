import request from "supertest";
import { createApp } from "../src/app";

describe("Ejercicio 04 - Idempotencia en enrollments (debes implementar)", () => {
  const app = createApp();

  it("POST /api/enrollments con Idempotency-Key devuelve mismo resultado (stub 501)", async () => {
    const key = "00000000-0000-0000-0000-000000000000";
    const body = { courseId: "course_demo", studentId: "student_demo" };

    const a = await request(app)
      .post("/api/enrollments")
      .set("Idempotency-Key", key)
      .set("Content-Type", "application/json")
      .send(body)
      .expect(501);

    const b = await request(app)
      .post("/api/enrollments")
      .set("Idempotency-Key", key)
      .set("Content-Type", "application/json")
      .send(body)
      .expect(501);

    expect(a.body.id).toBe(b.body.id);
  });
});
