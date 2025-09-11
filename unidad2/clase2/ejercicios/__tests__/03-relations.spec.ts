import request from "supertest";
import { createApp } from "../src/app";

describe("Ejercicio 03 - Relaciones (instructors, topics) (debes implementar)", () => {
  const app = createApp();

  it("GET /api/instructors/:id/courses lista cursos de un instructor (stub 501)", async () => {
    const res = await request(app)
      .get("/api/instructors/inst_demo/courses")
      .expect(501);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it("GET/POST/DELETE /api/courses/:id/topics maneja topics de un curso (stub 501)", async () => {
    await request(app).get("/api/courses/course_demo/topics").expect(501);
    await request(app)
      .post("/api/courses/course_demo/topics")
      .send({ topicId: "topic_http" })
      .set("Content-Type", "application/json")
      .expect(501);
    await request(app)
      .delete("/api/courses/course_demo/topics/topic_http")
      .expect(501);
  });
});
