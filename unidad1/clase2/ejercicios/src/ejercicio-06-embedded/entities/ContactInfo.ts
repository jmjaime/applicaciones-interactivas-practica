import { Column } from "typeorm";

export enum ContactPreference {
  EMAIL = "email",
  PHONE = "phone",
  SMS = "sms",
  WHATSAPP = "whatsapp",
  NONE = "none",
}

export class ContactInfo {
  @Column({ length: 255, nullable: false })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 20, nullable: true })
  alternativePhone?: string;

  @Column({ length: 255, nullable: true })
  alternativeEmail?: string;

  @Column({ length: 100, nullable: true })
  skype?: string;

  @Column({ length: 100, nullable: true })
  linkedin?: string;

  @Column({ length: 100, nullable: true })
  twitter?: string;

  @Column({ length: 100, nullable: true })
  facebook?: string;

  @Column({ length: 100, nullable: true })
  instagram?: string;

  @Column({ length: 100, nullable: true })
  website?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: ContactPreference.EMAIL,
  })
  preferredContactMethod: ContactPreference;

  @Column({ type: "boolean", default: true })
  allowEmailNotifications: boolean;

  @Column({ type: "boolean", default: false })
  allowSMSNotifications: boolean;

  @Column({ type: "boolean", default: false })
  allowWhatsappNotifications: boolean;

  @Column({ type: "boolean", default: false })
  allowPhoneNotifications: boolean;

  @Column({ type: "boolean", default: true })
  allowMarketingEmails: boolean;

  @Column({ type: "boolean", default: true })
  isEmailVerified: boolean;

  @Column({ type: "boolean", default: false })
  isPhoneVerified: boolean;

  @Column({ type: "datetime", nullable: true })
  emailVerifiedAt?: Date;

  @Column({ type: "datetime", nullable: true })
  phoneVerifiedAt?: Date;

  @Column({ type: "datetime", nullable: true })
  lastContactedAt?: Date;

  @Column({ type: "int", default: 0 })
  totalContactAttempts: number;

  @Column({ type: "int", default: 0 })
  successfulContacts: number;

  @Column({ type: "text", nullable: true })
  contactNotes?: string;

  constructor(
    email?: string,
    phone?: string,
    preferredContactMethod?: ContactPreference
  ) {
    this.email = email || "";
    this.phone = phone;
    this.preferredContactMethod =
      preferredContactMethod || ContactPreference.EMAIL;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getPreferredContactMethodDisplayName(): string {
    const methodNames: Record<ContactPreference, string> = {
      [ContactPreference.EMAIL]: "Email",
      [ContactPreference.PHONE]: "Teléfono",
      [ContactPreference.SMS]: "SMS",
      [ContactPreference.WHATSAPP]: "WhatsApp",
      [ContactPreference.NONE]: "Ninguno",
    };
    return methodNames[this.preferredContactMethod];
  }

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  isValidPhone(): boolean {
    if (!this.phone) return false;
    const phoneRegex = /^[\+]?[\s\-\(\)]*([0-9][\s\-\(\)]*){10,}$/;
    return phoneRegex.test(this.phone);
  }

  hasValidContact(): boolean {
    return this.isValidEmail() || this.isValidPhone();
  }

  getContactSummary(): string {
    const parts = [];

    if (this.email) parts.push(`📧 ${this.email}`);
    if (this.phone) parts.push(`📞 ${this.phone}`);
    if (this.alternativeEmail) parts.push(`📧² ${this.alternativeEmail}`);
    if (this.alternativePhone) parts.push(`📞² ${this.alternativePhone}`);

    return parts.join(" | ");
  }

  getSocialMediaSummary(): string {
    const socialLinks = [];

    if (this.linkedin) socialLinks.push(`LinkedIn: ${this.linkedin}`);
    if (this.twitter) socialLinks.push(`Twitter: ${this.twitter}`);
    if (this.facebook) socialLinks.push(`Facebook: ${this.facebook}`);
    if (this.instagram) socialLinks.push(`Instagram: ${this.instagram}`);
    if (this.website) socialLinks.push(`Website: ${this.website}`);

    return socialLinks.length > 0
      ? socialLinks.join(" | ")
      : "Sin redes sociales";
  }

  getNotificationPreferences(): string {
    const preferences = [];

    if (this.allowEmailNotifications) preferences.push("Email");
    if (this.allowSMSNotifications) preferences.push("SMS");
    if (this.allowWhatsappNotifications) preferences.push("WhatsApp");
    if (this.allowPhoneNotifications) preferences.push("Teléfono");

    return preferences.length > 0
      ? preferences.join(", ")
      : "Sin notificaciones";
  }

  canBeContacted(): boolean {
    return (
      this.hasValidContact() &&
      (this.allowEmailNotifications ||
        this.allowSMSNotifications ||
        this.allowWhatsappNotifications ||
        this.allowPhoneNotifications)
    );
  }

  canReceiveMarketingEmails(): boolean {
    return (
      this.isValidEmail() && this.allowMarketingEmails && this.isEmailVerified
    );
  }

  getVerificationStatus(): string {
    const statuses = [];

    if (this.isEmailVerified) statuses.push("✅ Email verificado");
    else statuses.push("❌ Email no verificado");

    if (this.phone) {
      if (this.isPhoneVerified) statuses.push("✅ Teléfono verificado");
      else statuses.push("❌ Teléfono no verificado");
    }

    return statuses.join(" | ");
  }

  verifyEmail(): void {
    this.isEmailVerified = true;
    this.emailVerifiedAt = new Date();
  }

  verifyPhone(): void {
    this.isPhoneVerified = true;
    this.phoneVerifiedAt = new Date();
  }

  recordContactAttempt(successful: boolean = false): void {
    this.totalContactAttempts++;
    this.lastContactedAt = new Date();

    if (successful) {
      this.successfulContacts++;
    }
  }

  getContactSuccessRate(): number {
    if (this.totalContactAttempts === 0) return 0;
    return Math.round(
      (this.successfulContacts / this.totalContactAttempts) * 100
    );
  }

  updateContactNotes(notes: string): void {
    this.contactNotes = notes;
  }

  addContactNote(note: string): void {
    const timestamp = new Date().toISOString();
    const newNote = `[${timestamp}] ${note}`;

    if (this.contactNotes) {
      this.contactNotes = `${this.contactNotes}\n${newNote}`;
    } else {
      this.contactNotes = newNote;
    }
  }

  hasAlternativeContact(): boolean {
    return !!(this.alternativeEmail || this.alternativePhone);
  }

  getAlternativeContactInfo(): string {
    const alternatives = [];

    if (this.alternativeEmail)
      alternatives.push(`Email: ${this.alternativeEmail}`);
    if (this.alternativePhone)
      alternatives.push(`Teléfono: ${this.alternativePhone}`);

    return alternatives.length > 0
      ? alternatives.join(" | ")
      : "Sin contacto alternativo";
  }

  getPrimaryContactInfo(): string {
    const primary = [];

    if (this.email) primary.push(`Email: ${this.email}`);
    if (this.phone) primary.push(`Teléfono: ${this.phone}`);

    return primary.join(" | ");
  }

  getAllContactMethods(): string[] {
    const methods = [];

    if (this.email) methods.push(`Email: ${this.email}`);
    if (this.phone) methods.push(`Teléfono: ${this.phone}`);
    if (this.alternativeEmail)
      methods.push(`Email alternativo: ${this.alternativeEmail}`);
    if (this.alternativePhone)
      methods.push(`Teléfono alternativo: ${this.alternativePhone}`);
    if (this.skype) methods.push(`Skype: ${this.skype}`);

    return methods;
  }

  getContactMethodByPreference(): string {
    switch (this.preferredContactMethod) {
      case ContactPreference.EMAIL:
        return this.email || "No disponible";
      case ContactPreference.PHONE:
        return this.phone || "No disponible";
      case ContactPreference.SMS:
        return this.phone || "No disponible";
      case ContactPreference.WHATSAPP:
        return this.phone || "No disponible";
      default:
        return "Contacto no permitido";
    }
  }

  setPreferredContactMethod(method: ContactPreference): void {
    this.preferredContactMethod = method;
  }

  enableAllNotifications(): void {
    this.allowEmailNotifications = true;
    this.allowSMSNotifications = true;
    this.allowWhatsappNotifications = true;
    this.allowPhoneNotifications = true;
    this.allowMarketingEmails = true;
  }

  disableAllNotifications(): void {
    this.allowEmailNotifications = false;
    this.allowSMSNotifications = false;
    this.allowWhatsappNotifications = false;
    this.allowPhoneNotifications = false;
    this.allowMarketingEmails = false;
  }

  updateNotificationPreferences(preferences: {
    email?: boolean;
    sms?: boolean;
    whatsapp?: boolean;
    phone?: boolean;
    marketing?: boolean;
  }): void {
    if (preferences.email !== undefined)
      this.allowEmailNotifications = preferences.email;
    if (preferences.sms !== undefined)
      this.allowSMSNotifications = preferences.sms;
    if (preferences.whatsapp !== undefined)
      this.allowWhatsappNotifications = preferences.whatsapp;
    if (preferences.phone !== undefined)
      this.allowPhoneNotifications = preferences.phone;
    if (preferences.marketing !== undefined)
      this.allowMarketingEmails = preferences.marketing;
  }

  getFormattedPhone(): string {
    if (!this.phone) return "";

    // Formatear número argentino
    const cleaned = this.phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `+54 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(
        7
      )}`;
    }
    return this.phone;
  }

  getDaysSinceLastContact(): number {
    if (!this.lastContactedAt) return -1;

    const now = new Date();
    const diffTime = now.getTime() - this.lastContactedAt.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  needsFollowUp(): boolean {
    const daysSinceLastContact = this.getDaysSinceLastContact();
    return (
      daysSinceLastContact > 30 ||
      (this.totalContactAttempts > 0 && this.successfulContacts === 0)
    );
  }

  getContactScore(): number {
    let score = 0;

    // Puntos por contacto válido
    if (this.isValidEmail()) score += 30;
    if (this.isValidPhone()) score += 20;

    // Puntos por verificación
    if (this.isEmailVerified) score += 15;
    if (this.isPhoneVerified) score += 10;

    // Puntos por contacto alternativo
    if (this.hasAlternativeContact()) score += 10;

    // Puntos por redes sociales
    const socialCount = [
      this.linkedin,
      this.twitter,
      this.facebook,
      this.instagram,
      this.website,
    ].filter((social) => social).length;
    score += socialCount * 2;

    // Descuentos por problemas
    if (this.getContactSuccessRate() < 50 && this.totalContactAttempts > 3)
      score -= 10;

    return Math.max(0, Math.min(100, score));
  }

  validateContactInfo(): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (!this.email || !this.isValidEmail()) {
      errors.push("Email inválido o faltante");
    }

    if (this.phone && !this.isValidPhone()) {
      errors.push("Formato de teléfono inválido");
    }

    if (this.alternativeEmail && !this.isValidEmail()) {
      errors.push("Email alternativo inválido");
    }

    if (!this.canBeContacted()) {
      errors.push("No se puede contactar (sin métodos válidos habilitados)");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  clone(): ContactInfo {
    const clone = new ContactInfo(
      this.email,
      this.phone,
      this.preferredContactMethod
    );
    clone.alternativePhone = this.alternativePhone;
    clone.alternativeEmail = this.alternativeEmail;
    clone.skype = this.skype;
    clone.linkedin = this.linkedin;
    clone.twitter = this.twitter;
    clone.facebook = this.facebook;
    clone.instagram = this.instagram;
    clone.website = this.website;
    clone.allowEmailNotifications = this.allowEmailNotifications;
    clone.allowSMSNotifications = this.allowSMSNotifications;
    clone.allowWhatsappNotifications = this.allowWhatsappNotifications;
    clone.allowPhoneNotifications = this.allowPhoneNotifications;
    clone.allowMarketingEmails = this.allowMarketingEmails;
    clone.isEmailVerified = this.isEmailVerified;
    clone.isPhoneVerified = this.isPhoneVerified;
    clone.contactNotes = this.contactNotes;
    return clone;
  }

  equals(other: ContactInfo): boolean {
    return (
      this.email === other.email &&
      this.phone === other.phone &&
      this.preferredContactMethod === other.preferredContactMethod
    );
  }

  toString(): string {
    return `ContactInfo(${this.email}, ${
      this.phone || "Sin teléfono"
    }, ${this.getPreferredContactMethodDisplayName()})`;
  }
}
