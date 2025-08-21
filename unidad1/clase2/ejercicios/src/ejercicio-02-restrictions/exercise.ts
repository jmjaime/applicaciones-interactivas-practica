import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Doctor, DoctorStatus, MedicalSpecialty } from "./entities/Doctor";
import { Patient } from "./entities/Patient";

// Ejercicio 02 – Restricciones e índices con TypeORM
// Instrucciones: Implementá las funciones marcadas con TODO aplicando UNIQUE, CHECK, índices,
// y validaciones con class-validator donde corresponda. No modifiques las entidades.

export async function clearRestrictionsData(): Promise<void> {
  const doctorRepo = AppDataSource.getRepository(Doctor);
  const patientRepo = AppDataSource.getRepository(Patient);
  await patientRepo.clear();
  await doctorRepo.clear();
}

export async function createDoctor(input: Partial<Doctor>): Promise<Doctor> {
  // TODO: validar y persistir un médico. Debe respetar UNIQUE(email, licenseNumber)
  // y las @Check de años de experiencia y fee. Devolver la entidad guardada.
  throw new Error("TODO: Implement createDoctor");
}

export async function createPatient(input: Partial<Patient>): Promise<Patient> {
  // TODO: crear y guardar un paciente con validaciones básicas
  throw new Error("TODO: Implement createPatient");
}

export async function listActiveDoctors(): Promise<Doctor[]> {
  // TODO: devolver todos los médicos con status ACTIVE ordenados por lastName ASC
  throw new Error("TODO: Implement listActiveDoctors");
}

export async function findDoctorsBySpecialty(
  specialty: MedicalSpecialty
): Promise<Doctor[]> {
  // TODO: buscar por specialty usando índice; ordenar por yearsOfExperience DESC
  throw new Error("TODO: Implement findDoctorsBySpecialty");
}

export async function getTopRatedDoctors(minRating: number): Promise<Doctor[]> {
  // TODO: filtrar por rating >= minRating, ordenar por rating DESC
  throw new Error("TODO: Implement getTopRatedDoctors");
}

export async function updateDoctorStatus(
  licenseNumber: string,
  status: DoctorStatus
): Promise<Doctor | null> {
  // TODO: actualizar status por licenseNumber y devolver entidad actualizada o null si no existe
  throw new Error("TODO: Implement updateDoctorStatus");
}

export async function updateConsultationFee(
  licenseNumber: string,
  newFee: number
): Promise<Doctor | null> {
  // TODO: actualizar consultationFee, respetando la @Check de fee >= 0
  throw new Error("TODO: Implement updateConsultationFee");
}
