import {
  ManyToManyExercise,
  courses as n2mCourses,
  students as n2mStudents,
  enrollments as n2mEnrollments,
} from "./exercise";

describe("Many-to-Many (student ↔ course)", () => {
  it("should run schema and inserts without error", async () => {
    const ex = new ManyToManyExercise();
    await ex.createSchema();
    await ex.insertData();
  });

  it("getAllEnrollments returns the sample enrollments count", async () => {
    const ex = new ManyToManyExercise();
    const all = await ex.getAllEnrollments();
    expect(all.length).toBe(n2mEnrollments.length);
  });

  it("getEnrollmentsByCourse returns the expected count for the course", async () => {
    const ex = new ManyToManyExercise();
    const course = n2mCourses[0];
    const expected = n2mEnrollments.filter(
      (e) => e.courseId === (course.id as number)
    ).length;
    const byCourse = await ex.getEnrollmentsByCourse(course.courseCode);
    expect(byCourse.length).toBe(expected);
  });

  it("filterStudentsByProgram returns the expected count", async () => {
    const ex = new ManyToManyExercise();
    const program = n2mStudents[0].program;
    const expected = n2mStudents.filter((s) => s.program === program).length;
    const byProgram = await ex.filterStudentsByProgram(program);
    expect(byProgram.length).toBe(expected);
  });
});
