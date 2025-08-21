import { Column } from "typeorm";

export enum AddressType {
  HOME = "home",
  WORK = "work",
  BILLING = "billing",
  SHIPPING = "shipping",
  OTHER = "other",
}

export class Address {
  @Column({ length: 200, nullable: true })
  street?: string;

  @Column({ length: 50, nullable: true })
  streetNumber?: string;

  @Column({ length: 50, nullable: true })
  apartment?: string;

  @Column({ length: 100, nullable: true })
  city?: string;

  @Column({ length: 100, nullable: true })
  state?: string;

  @Column({ length: 20, nullable: true })
  zipCode?: string;

  @Column({ length: 100, nullable: true })
  country?: string;

  @Column({ length: 100, nullable: true })
  neighborhood?: string;

  @Column({ length: 100, nullable: true })
  district?: string;

  @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
  longitude?: number;

  @Column({
    type: "varchar",
    length: 20,
    default: AddressType.HOME,
  })
  type: AddressType;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "datetime", nullable: true })
  verifiedAt?: Date;

  @Column({ type: "text", nullable: true })
  additionalInfo?: string;

  @Column({ type: "text", nullable: true })
  deliveryInstructions?: string;

  @Column({ type: "text", nullable: true })
  landmarks?: string;

  constructor(
    street?: string,
    city?: string,
    state?: string,
    country?: string,
    type?: AddressType
  ) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.type = type || AddressType.HOME;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getTypeDisplayName(): string {
    const typeNames: Record<AddressType, string> = {
      [AddressType.HOME]: "Casa",
      [AddressType.WORK]: "Trabajo",
      [AddressType.BILLING]: "Facturación",
      [AddressType.SHIPPING]: "Envío",
      [AddressType.OTHER]: "Otro",
    };
    return typeNames[this.type];
  }

  getFullAddress(): string {
    const parts = [];

    if (this.street) {
      let streetPart = this.street;
      if (this.streetNumber) streetPart += ` ${this.streetNumber}`;
      if (this.apartment) streetPart += `, Depto. ${this.apartment}`;
      parts.push(streetPart);
    }

    if (this.neighborhood) parts.push(this.neighborhood);
    if (this.city) parts.push(this.city);
    if (this.state) parts.push(this.state);
    if (this.country) parts.push(this.country);
    if (this.zipCode) parts.push(`CP ${this.zipCode}`);

    return parts.join(", ");
  }

  getShortAddress(): string {
    const parts = [];

    if (this.street) {
      let streetPart = this.street;
      if (this.streetNumber) streetPart += ` ${this.streetNumber}`;
      parts.push(streetPart);
    }

    if (this.city) parts.push(this.city);
    if (this.state) parts.push(this.state);

    return parts.join(", ");
  }

  getStreetAddress(): string {
    const parts = [];

    if (this.street) parts.push(this.street);
    if (this.streetNumber) parts.push(this.streetNumber);
    if (this.apartment) parts.push(`Depto. ${this.apartment}`);

    return parts.join(" ");
  }

  getCityStateCountry(): string {
    const parts = [];

    if (this.city) parts.push(this.city);
    if (this.state) parts.push(this.state);
    if (this.country) parts.push(this.country);

    return parts.join(", ");
  }

  getFormattedAddress(): string {
    const lines = [];

    // Línea 1: Calle y número
    const streetLine = this.getStreetAddress();
    if (streetLine) lines.push(streetLine);

    // Línea 2: Barrio (si existe)
    if (this.neighborhood) lines.push(this.neighborhood);

    // Línea 3: Ciudad, Estado, CP
    let cityLine = "";
    if (this.city) cityLine += this.city;
    if (this.state) cityLine += (cityLine ? ", " : "") + this.state;
    if (this.zipCode) cityLine += (cityLine ? " " : "") + this.zipCode;
    if (cityLine) lines.push(cityLine);

    // Línea 4: País
    if (this.country) lines.push(this.country);

    return lines.join("\n");
  }

  isComplete(): boolean {
    return !!(this.street && this.city && this.state && this.country);
  }

  getCompletionPercentage(): number {
    const fields = [
      this.street,
      this.streetNumber,
      this.city,
      this.state,
      this.country,
      this.zipCode,
    ];

    const filledFields = fields.filter(
      (field) => field && field.trim() !== ""
    ).length;
    return Math.round((filledFields / fields.length) * 100);
  }

  hasCoordinates(): boolean {
    return (
      this.latitude !== null &&
      this.longitude !== null &&
      this.latitude !== undefined &&
      this.longitude !== undefined
    );
  }

  setCoordinates(lat: number, lng: number): void {
    this.latitude = lat;
    this.longitude = lng;
  }

  getCoordinates(): { lat: number; lng: number } | null {
    if (!this.hasCoordinates()) return null;
    return {
      lat: this.latitude!,
      lng: this.longitude!,
    };
  }

  getGoogleMapsUrl(): string {
    if (this.hasCoordinates()) {
      return `https://maps.google.com/maps?q=${this.latitude},${this.longitude}`;
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(
      this.getFullAddress()
    )}`;
  }

  verify(): void {
    this.isVerified = true;
    this.verifiedAt = new Date();
  }

  unverify(): void {
    this.isVerified = false;
    this.verifiedAt = undefined;
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  setAdditionalInfo(info: string): void {
    this.additionalInfo = info;
  }

  setDeliveryInstructions(instructions: string): void {
    this.deliveryInstructions = instructions;
  }

  setLandmarks(landmarks: string): void {
    this.landmarks = landmarks;
  }

  isSameCity(other: Address): boolean {
    return (
      this.city === other.city &&
      this.state === other.state &&
      this.country === other.country
    );
  }

  isSameState(other: Address): boolean {
    return this.state === other.state && this.country === other.country;
  }

  isSameCountry(other: Address): boolean {
    return this.country === other.country;
  }

  getDistanceFrom(other: Address): number | null {
    if (!this.hasCoordinates() || !other.hasCoordinates()) return null;

    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(other.latitude! - this.latitude!);
    const dLon = this.toRad(other.longitude! - this.longitude!);
    const lat1 = this.toRad(this.latitude!);
    const lat2 = this.toRad(other.latitude!);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  isWithinRadius(
    centerLat: number,
    centerLng: number,
    radiusKm: number
  ): boolean {
    if (!this.hasCoordinates()) return false;

    // Crear address temporal con coordenadas del centro
    const centerAddress = new Address();
    centerAddress.latitude = centerLat;
    centerAddress.longitude = centerLng;

    const actualDistance = this.getDistanceFrom(centerAddress);
    return actualDistance !== null && actualDistance <= radiusKm;
  }

  isInArgentina(): boolean {
    return (
      this.country?.toLowerCase().includes("argentina") ||
      this.country?.toLowerCase().includes("arg") ||
      this.country === "AR"
    );
  }

  isInBuenosAires(): boolean {
    return (
      this.isInArgentina() &&
      ((this.state?.toLowerCase().includes("buenos aires") ?? false) ||
        (this.city?.toLowerCase().includes("buenos aires") ?? false))
    );
  }

  getTimeZone(): string {
    // Simplificado para Argentina
    if (this.isInArgentina()) {
      return "America/Argentina/Buenos_Aires";
    }
    // Por defecto UTC
    return "UTC";
  }

  getPostalCodeInfo(): string {
    if (!this.zipCode) return "Sin código postal";

    if (this.isInArgentina()) {
      return `Código Postal: ${this.zipCode}`;
    }

    return `ZIP/Postal: ${this.zipCode}`;
  }

  validateAddress(): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (!this.street || this.street.trim() === "") {
      errors.push("La calle es obligatoria");
    }

    if (!this.city || this.city.trim() === "") {
      errors.push("La ciudad es obligatoria");
    }

    if (!this.state || this.state.trim() === "") {
      errors.push("El estado/provincia es obligatorio");
    }

    if (!this.country || this.country.trim() === "") {
      errors.push("El país es obligatorio");
    }

    if (this.zipCode && this.zipCode.length < 3) {
      errors.push("El código postal debe tener al menos 3 caracteres");
    }

    if (
      this.latitude !== undefined &&
      (this.latitude < -90 || this.latitude > 90)
    ) {
      errors.push("Latitud inválida");
    }

    if (
      this.longitude !== undefined &&
      (this.longitude < -180 || this.longitude > 180)
    ) {
      errors.push("Longitud inválida");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  normalizeAddress(): void {
    if (this.street) this.street = this.street.trim();
    if (this.streetNumber) this.streetNumber = this.streetNumber.trim();
    if (this.apartment) this.apartment = this.apartment.trim();
    if (this.city) this.city = this.city.trim();
    if (this.state) this.state = this.state.trim();
    if (this.country) this.country = this.country.trim();
    if (this.zipCode) this.zipCode = this.zipCode.trim();
    if (this.neighborhood) this.neighborhood = this.neighborhood.trim();
    if (this.district) this.district = this.district.trim();
  }

  getAddressForShipping(): string {
    const shippingParts = [];

    // Información del destinatario se agregaría aparte
    shippingParts.push(this.getStreetAddress());

    if (this.neighborhood) shippingParts.push(this.neighborhood);

    let cityLine = "";
    if (this.city) cityLine += this.city;
    if (this.state) cityLine += (cityLine ? ", " : "") + this.state;
    if (this.zipCode) cityLine += (cityLine ? " " : "") + this.zipCode;
    if (cityLine) shippingParts.push(cityLine);

    if (this.country) shippingParts.push(this.country);

    if (this.deliveryInstructions) {
      shippingParts.push(`Instrucciones: ${this.deliveryInstructions}`);
    }

    return shippingParts.join("\n");
  }

  getAddressScore(): number {
    let score = 0;

    // Puntos básicos por completitud
    if (this.street) score += 20;
    if (this.streetNumber) score += 10;
    if (this.city) score += 15;
    if (this.state) score += 10;
    if (this.country) score += 10;
    if (this.zipCode) score += 10;

    // Puntos por información adicional
    if (this.neighborhood) score += 5;
    if (this.apartment) score += 5;
    if (this.hasCoordinates()) score += 10;

    // Bonificación por verificación
    if (this.isVerified) score += 5;

    return Math.min(100, score);
  }

  clone(): Address {
    const clone = new Address(
      this.street,
      this.city,
      this.state,
      this.country,
      this.type
    );
    clone.streetNumber = this.streetNumber;
    clone.apartment = this.apartment;
    clone.zipCode = this.zipCode;
    clone.neighborhood = this.neighborhood;
    clone.district = this.district;
    clone.latitude = this.latitude;
    clone.longitude = this.longitude;
    clone.isActive = this.isActive;
    clone.isVerified = this.isVerified;
    clone.verifiedAt = this.verifiedAt;
    clone.additionalInfo = this.additionalInfo;
    clone.deliveryInstructions = this.deliveryInstructions;
    clone.landmarks = this.landmarks;
    return clone;
  }

  equals(other: Address): boolean {
    return (
      this.street === other.street &&
      this.streetNumber === other.streetNumber &&
      this.apartment === other.apartment &&
      this.city === other.city &&
      this.state === other.state &&
      this.country === other.country &&
      this.zipCode === other.zipCode
    );
  }

  toString(): string {
    return `Address(${this.getShortAddress()}, ${this.getTypeDisplayName()})`;
  }
}
