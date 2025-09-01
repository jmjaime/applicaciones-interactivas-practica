import { Student, findTopStudent } from "./exercise";

describe("clases y filtrado", () => {
  it("devuelve el estudiante con mayor score", () => {
    const students = [
      new Student("Ana", 80),
      new Student("Bruno", 95),
      new Student("Carla", 90),
    ];
    const top = findTopStudent(students);
    expect(top?.name).toBe("Bruno");
    expect(top?.score).toBe(95);
  });

  it("filtra por minScore antes de elegir el mejor", () => {
    const students = [
      new Student("Ana", 80),
      new Student("Bruno", 95),
      new Student("Carla", 90),
    ];
    const top = findTopStudent(students, 92);
    expect(top?.name).toBe("Bruno");
  });

  it("retorna null si no hay estudiantes o no hay coincidencias", () => {
    expect(findTopStudent([])).toBeNull();
    const students = [new Student("Ana", 80)];
    expect(findTopStudent(students, 100)).toBeNull();
  });
});
