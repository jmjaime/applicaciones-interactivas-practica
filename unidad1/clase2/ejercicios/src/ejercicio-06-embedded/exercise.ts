import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Student, EducationLevel, StudentStatus } from "./entities/Student";
import { PersonalInfo, Gender } from "./entities/PersonalInfo";
import { ContactInfo, ContactPreference } from "./entities/ContactInfo";
import { Address, AddressType } from "./entities/Address";

// Ejercicio 06 – Objetos Embebidos
// Implementá las funciones usando embebidos (Address, ContactInfo, PersonalInfo) y transformers.

export async function clearEmbeddedData(): Promise<void> {
  await AppDataSource.getRepository(Student).clear();
}

export async function createStudentWithEmbedded(input: {
  studentId?: string;
  personal: Partial<PersonalInfo>;
  contact: Partial<ContactInfo>;
  address: Partial<Address>;
  educationLevel?: EducationLevel;
  status?: StudentStatus;
}): Promise<Student> {
  // TODO: crear Student con objetos embebidos usando los Partial recibidos
  // - Validar datos mínimos (email, nombres)
  // - Persistir y devolver entidad
  throw new Error("TODO: Implement createStudentWithEmbedded");
}

export async function updateEmbeddedContact(
  studentId: number,
  updates: Partial<ContactInfo>
): Promise<Student> {
  // TODO: actualizar embebido contactInfo (e.g., phone, preferences)
  // - Guardar y devolver Student actualizado
  throw new Error("TODO: Implement updateEmbeddedContact");
}

export async function findByCityAndGender(
  city: string,
  gender: Gender
): Promise<Student[]> {
  // TODO: filtrar por address.city y personalInfo.gender
  throw new Error("TODO: Implement findByCityAndGender");
}

export async function listWithPreferences(): Promise<
  Array<{
    id: number;
    studentId: string;
    theme?: string;
    notifications?: boolean;
  }>
> {
  // TODO: usar select/transformer para mapear preferencias desde JSON (preferences.theme, preferences.notifications)
  throw new Error("TODO: Implement listWithPreferences");
}
