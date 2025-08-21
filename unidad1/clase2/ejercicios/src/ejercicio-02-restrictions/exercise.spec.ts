import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearRestrictionsData,
  createDoctor,
  createPatient,
  listActiveDoctors,
  findDoctorsBySpecialty,
  getTopRatedDoctors,
  updateDoctorStatus,
  updateConsultationFee,
} from "./exercise";
import { MedicalSpecialty, DoctorStatus } from "./entities/Doctor";

describe("Ejercicio 02 - Restricciones y validaciones", () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearRestrictionsData();
  });

  it("debe crear médico y paciente válidos", async () => {
    const doc = await createDoctor({
      firstName: "Ana",
      lastName: "García",
      licenseNumber: "LIC-001",
      specialty: MedicalSpecialty.CARDIOLOGY,
      email: "ana@hospital.test",
      yearsOfExperience: 5,
      consultationFee: 100,
    });
    expect(doc.id).toBeDefined();

    const pat = await createPatient({
      firstName: "Carlos",
      lastName: "Ruiz",
      documentNumber: "DNI-1",
    });
    expect(pat.id).toBeDefined();
  });

  it("listActiveDoctors devuelve sólo activos y ordenados por apellido", async () => {
    await createDoctor({
      firstName: "Ana",
      lastName: "Zuluaga",
      licenseNumber: "LIC-A",
      specialty: MedicalSpecialty.NEUROLOGY,
      email: "ana@h.test",
      status: DoctorStatus.ACTIVE,
    });
    await createDoctor({
      firstName: "Bruno",
      lastName: "Alvarez",
      licenseNumber: "LIC-B",
      specialty: MedicalSpecialty.NEUROLOGY,
      email: "bru@h.test",
      status: DoctorStatus.INACTIVE,
    });
    const list = await listActiveDoctors();
    expect(list.every((d) => d.status === DoctorStatus.ACTIVE)).toBe(true);
    // orden ascendente por apellido
    for (let i = 1; i < list.length; i++) {
      expect(list[i - 1].lastName <= list[i].lastName).toBe(true);
    }
  });

  it("findDoctorsBySpecialty filtra por especialidad y ordena por experiencia DESC", async () => {
    await createDoctor({
      firstName: "A",
      lastName: "A",
      licenseNumber: "LIC-1",
      specialty: MedicalSpecialty.CARDIOLOGY,
      email: "a@h.test",
      yearsOfExperience: 1,
    });
    await createDoctor({
      firstName: "B",
      lastName: "B",
      licenseNumber: "LIC-2",
      specialty: MedicalSpecialty.CARDIOLOGY,
      email: "b@h.test",
      yearsOfExperience: 10,
    });
    const list = await findDoctorsBySpecialty(MedicalSpecialty.CARDIOLOGY);
    expect(list.length).toBe(2);
    expect(list[0].yearsOfExperience >= list[1].yearsOfExperience).toBe(true);
  });

  it("getTopRatedDoctors filtra por rating mínimo", async () => {
    await createDoctor({
      firstName: "A",
      lastName: "A",
      licenseNumber: "LIC-3",
      specialty: MedicalSpecialty.DERMATOLOGY,
      email: "a2@h.test",
      rating: 4.8,
    });
    await createDoctor({
      firstName: "B",
      lastName: "B",
      licenseNumber: "LIC-4",
      specialty: MedicalSpecialty.DERMATOLOGY,
      email: "b2@h.test",
      rating: 3.0,
    });
    const list = await getTopRatedDoctors(4.0);
    expect(list.every((d) => d.rating >= 4.0)).toBe(true);
  });

  it("updateDoctorStatus y updateConsultationFee actualizan campos esperados", async () => {
    await createDoctor({
      firstName: "Ana",
      lastName: "García",
      licenseNumber: "LIC-9",
      specialty: MedicalSpecialty.PEDIATRICS,
      email: "ana9@h.test",
      status: DoctorStatus.ACTIVE,
      consultationFee: 150,
    });
    const updated = await updateDoctorStatus("LIC-9", DoctorStatus.ON_LEAVE);
    expect(updated?.status).toBe(DoctorStatus.ON_LEAVE);

    const updatedFee = await updateConsultationFee("LIC-9", 200);
    expect(Number(updatedFee?.consultationFee)).toBe(200);
  });
});
