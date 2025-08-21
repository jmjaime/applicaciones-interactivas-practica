import { Column } from "typeorm";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  PREFER_NOT_TO_SAY = "prefer_not_to_say",
}

export class PersonalInfo {
  @Column({ length: 100, nullable: false })
  firstName: string;

  @Column({ length: 100, nullable: false })
  lastName: string;

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
  })
  gender?: Gender;

  @Column({ length: 50, nullable: true })
  nationality?: string;

  @Column({ length: 20, nullable: true })
  documentType?: string; // DNI, Passport, etc.

  @Column({ length: 50, nullable: true })
  documentNumber?: string;

  @Column({ length: 200, nullable: true })
  biography?: string;

  @Column({ length: 255, nullable: true })
  profilePicture?: string;

  @Column({ length: 20, nullable: true })
  preferredLanguage?: string;

  @Column({ length: 50, nullable: true })
  timezone?: string;

  constructor(
    firstName?: string,
    lastName?: string,
    birthDate?: Date,
    gender?: Gender
  ) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.birthDate = birthDate;
    this.gender = gender;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getInitials(): string {
    return `${this.firstName.charAt(0)}${this.lastName.charAt(
      0
    )}`.toUpperCase();
  }

  getAge(): number | null {
    if (!this.birthDate) return null;

    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  getGenderDisplayName(): string {
    const genderNames: Record<Gender, string> = {
      [Gender.MALE]: "Masculino",
      [Gender.FEMALE]: "Femenino",
      [Gender.OTHER]: "Otro",
      [Gender.PREFER_NOT_TO_SAY]: "Prefiero no decir",
    };
    return this.gender ? genderNames[this.gender] : "Sin especificar";
  }

  isAdult(): boolean {
    const age = this.getAge();
    return age !== null && age >= 18;
  }

  isMinor(): boolean {
    const age = this.getAge();
    return age !== null && age < 18;
  }

  getDocumentInfo(): string {
    if (!this.documentType || !this.documentNumber) {
      return "Sin información de documento";
    }
    return `${this.documentType}: ${this.documentNumber}`;
  }

  getProfileSummary(): string {
    const parts = [this.getFullName()];

    const age = this.getAge();
    if (age !== null) {
      parts.push(`${age} años`);
    }

    if (this.nationality) {
      parts.push(this.nationality);
    }

    if (this.gender) {
      parts.push(this.getGenderDisplayName());
    }

    return parts.join(" | ");
  }

  hasCompleteProfile(): boolean {
    return !!(
      this.firstName &&
      this.lastName &&
      this.birthDate &&
      this.gender &&
      this.nationality &&
      this.documentType &&
      this.documentNumber
    );
  }

  getCompletionPercentage(): number {
    const fields = [
      this.firstName,
      this.lastName,
      this.birthDate,
      this.gender,
      this.nationality,
      this.documentType,
      this.documentNumber,
      this.biography,
      this.profilePicture,
      this.preferredLanguage,
      this.timezone,
    ];

    const filledFields = fields.filter(
      (field) => field !== null && field !== undefined && field !== ""
    ).length;
    return Math.round((filledFields / fields.length) * 100);
  }

  updateBiography(newBiography: string): void {
    this.biography = newBiography.substring(0, 200); // Limitar a 200 caracteres
  }

  updateProfilePicture(pictureUrl: string): void {
    this.profilePicture = pictureUrl;
  }

  setPreferredLanguage(language: string): void {
    this.preferredLanguage = language;
  }

  setTimezone(timezone: string): void {
    this.timezone = timezone;
  }

  isValidForRegistration(): boolean {
    return !!(
      this.firstName &&
      this.lastName &&
      this.birthDate &&
      this.isAdult()
    );
  }

  getDisplayName(): string {
    return this.getFullName();
  }

  getShortInfo(): string {
    const parts = [this.getInitials()];

    const age = this.getAge();
    if (age !== null) {
      parts.push(`${age}a`);
    }

    if (this.nationality) {
      parts.push(this.nationality.substring(0, 3).toUpperCase());
    }

    return parts.join(" | ");
  }

  getBirthDateFormatted(): string {
    if (!this.birthDate) return "Sin fecha";
    return this.birthDate.toLocaleDateString();
  }

  canVote(): boolean {
    const age = this.getAge();
    return age !== null && age >= 16; // Edad mínima para votar en Argentina
  }

  canDrive(): boolean {
    const age = this.getAge();
    return age !== null && age >= 17; // Edad mínima para conducir en Argentina
  }

  getLifeStage(): string {
    const age = this.getAge();
    if (age === null) return "Desconocido";

    if (age < 13) return "Niño";
    if (age < 18) return "Adolescente";
    if (age < 30) return "Joven Adulto";
    if (age < 50) return "Adulto";
    if (age < 65) return "Adulto Mayor";
    return "Tercera Edad";
  }

  needsParentalConsent(): boolean {
    return this.isMinor();
  }

  getNameForCertificate(): string {
    // Nombre formal para certificados
    return `${this.firstName.toUpperCase()} ${this.lastName.toUpperCase()}`;
  }

  validatePersonalInfo(): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (!this.firstName || this.firstName.trim().length === 0) {
      errors.push("El nombre es obligatorio");
    }

    if (!this.lastName || this.lastName.trim().length === 0) {
      errors.push("El apellido es obligatorio");
    }

    if (this.birthDate && this.birthDate > new Date()) {
      errors.push("La fecha de nacimiento no puede ser futura");
    }

    if (this.documentNumber && this.documentNumber.length < 6) {
      errors.push("El número de documento debe tener al menos 6 caracteres");
    }

    if (this.biography && this.biography.length > 200) {
      errors.push("La biografía no puede exceder 200 caracteres");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  clone(): PersonalInfo {
    const clone = new PersonalInfo(
      this.firstName,
      this.lastName,
      this.birthDate,
      this.gender
    );
    clone.nationality = this.nationality;
    clone.documentType = this.documentType;
    clone.documentNumber = this.documentNumber;
    clone.biography = this.biography;
    clone.profilePicture = this.profilePicture;
    clone.preferredLanguage = this.preferredLanguage;
    clone.timezone = this.timezone;
    return clone;
  }

  equals(other: PersonalInfo): boolean {
    return (
      this.firstName === other.firstName &&
      this.lastName === other.lastName &&
      this.birthDate?.getTime() === other.birthDate?.getTime() &&
      this.gender === other.gender &&
      this.nationality === other.nationality &&
      this.documentType === other.documentType &&
      this.documentNumber === other.documentNumber
    );
  }

  toString(): string {
    return `PersonalInfo(${this.getFullName()}, ${
      this.getAge() || "N/A"
    } años, ${this.getGenderDisplayName()})`;
  }
}
