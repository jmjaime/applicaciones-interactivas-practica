import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Employee } from "./Employee";

export enum SkillCategory {
  PROGRAMMING = "programming",
  FRAMEWORK = "framework",
  DATABASE = "database",
  CLOUD = "cloud",
  DEVOPS = "devops",
  TESTING = "testing",
  DESIGN = "design",
  METHODOLOGY = "methodology",
  SOFT_SKILL = "soft_skill",
  LANGUAGE = "language",
  CERTIFICATION = "certification",
  TOOL = "tool",
}

export enum SkillLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
  MASTER = "master",
}

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true, nullable: false })
  name: string;

  @Column({
    type: "varchar",
    length: 20,
    default: SkillCategory.PROGRAMMING,
  })
  category: SkillCategory;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isCertification: boolean;

  @Column({ type: "boolean", default: false })
  isInDemand: boolean;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  marketValue: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  employeeCount: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  projectCount: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  averageExperience: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  popularityScore: number;

  @Column({ length: 50, nullable: true })
  version?: string;

  @Column({ length: 100, nullable: true })
  vendor?: string;

  @Column({ length: 255, nullable: true })
  officialUrl?: string;

  @Column({ length: 255, nullable: true })
  documentationUrl?: string;

  @Column({ type: "text", nullable: true })
  prerequisites?: string;

  @Column({ type: "text", nullable: true })
  relatedSkills?: string;

  @Column({ type: "text", nullable: true })
  careerPath?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @ManyToMany(() => Employee, (employee) => employee.skills)
  employees: Employee[];

  constructor(name?: string, category?: SkillCategory) {
    this.name = name || "";
    this.category = category || SkillCategory.PROGRAMMING;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getCategoryDisplayName(): string {
    const categoryNames: Record<SkillCategory, string> = {
      [SkillCategory.PROGRAMMING]: "Programación",
      [SkillCategory.FRAMEWORK]: "Framework",
      [SkillCategory.DATABASE]: "Base de Datos",
      [SkillCategory.CLOUD]: "Cloud Computing",
      [SkillCategory.DEVOPS]: "DevOps",
      [SkillCategory.TESTING]: "Testing",
      [SkillCategory.DESIGN]: "Diseño",
      [SkillCategory.METHODOLOGY]: "Metodología",
      [SkillCategory.SOFT_SKILL]: "Habilidad Blanda",
      [SkillCategory.LANGUAGE]: "Idioma",
      [SkillCategory.CERTIFICATION]: "Certificación",
      [SkillCategory.TOOL]: "Herramienta",
    };
    return categoryNames[this.category];
  }

  getMarketValueLevel(): string {
    if (this.marketValue >= 4.5) return "Muy Alto";
    if (this.marketValue >= 4.0) return "Alto";
    if (this.marketValue >= 3.5) return "Medio-Alto";
    if (this.marketValue >= 3.0) return "Medio";
    if (this.marketValue >= 2.5) return "Medio-Bajo";
    if (this.marketValue >= 2.0) return "Bajo";
    return "Muy Bajo";
  }

  getPopularityLevel(): string {
    if (this.popularityScore >= 4.5) return "Muy Popular";
    if (this.popularityScore >= 4.0) return "Popular";
    if (this.popularityScore >= 3.5) return "Moderadamente Popular";
    if (this.popularityScore >= 3.0) return "Estándar";
    if (this.popularityScore >= 2.5) return "Nicho";
    if (this.popularityScore >= 2.0) return "Especializado";
    return "Emergente";
  }

  getExperienceLevel(): string {
    if (this.averageExperience >= 8) return "Experto";
    if (this.averageExperience >= 5) return "Avanzado";
    if (this.averageExperience >= 3) return "Intermedio";
    if (this.averageExperience >= 1) return "Principiante";
    return "Novato";
  }

  isHighValue(): boolean {
    return this.marketValue >= 4.0;
  }

  isPopular(): boolean {
    return this.popularityScore >= 4.0;
  }

  isSpecialized(): boolean {
    return this.employeeCount < 5 && this.marketValue >= 3.5;
  }

  isCommon(): boolean {
    return this.employeeCount >= 10;
  }

  isEmerging(): boolean {
    return this.popularityScore >= 3.0 && this.averageExperience < 2;
  }

  isLegacy(): boolean {
    return this.popularityScore < 2.5 && this.averageExperience >= 5;
  }

  getDemandLevel(): string {
    if (this.isInDemand && this.isHighValue()) return "Crítico";
    if (this.isInDemand) return "Alto";
    if (this.isHighValue()) return "Moderado";
    if (this.isPopular()) return "Estándar";
    return "Bajo";
  }

  getSkillSummary(): string {
    const parts = [
      this.name,
      this.getCategoryDisplayName(),
      `${this.employeeCount} empleados`,
      `Valor: ${this.getMarketValueLevel()}`,
    ];

    if (this.version) parts.push(`v${this.version}`);
    if (this.isCertification) parts.push("Certificación");
    if (this.isInDemand) parts.push("En demanda");

    return parts.join(" | ");
  }

  getSkillMetrics(): string {
    return (
      `Empleados: ${this.employeeCount} | ` +
      `Proyectos: ${this.projectCount} | ` +
      `Experiencia promedio: ${this.averageExperience.toFixed(1)} años | ` +
      `Popularidad: ${this.getPopularityLevel()}`
    );
  }

  getSkillValue(): string {
    return (
      `Valor de mercado: ${this.getMarketValueLevel()} (${this.marketValue.toFixed(
        1
      )}/5) | ` + `Demanda: ${this.getDemandLevel()}`
    );
  }

  getSkillDetails(): string {
    const details = [];

    if (this.vendor) details.push(`Proveedor: ${this.vendor}`);
    if (this.version) details.push(`Versión: ${this.version}`);
    if (this.prerequisites)
      details.push(`Prerrequisitos: ${this.prerequisites}`);
    if (this.relatedSkills)
      details.push(`Habilidades relacionadas: ${this.relatedSkills}`);

    return details.join(" | ");
  }

  incrementEmployeeCount(): void {
    this.employeeCount++;
    this.updatePopularityScore();
  }

  decrementEmployeeCount(): void {
    if (this.employeeCount > 0) {
      this.employeeCount--;
      this.updatePopularityScore();
    }
  }

  incrementProjectCount(): void {
    this.projectCount++;
  }

  updateAverageExperience(newExperience: number): void {
    // Simplified calculation - in reality you'd need to track all experiences
    this.averageExperience = (this.averageExperience + newExperience) / 2;
  }

  updateMarketValue(value: number): void {
    this.marketValue = Math.max(0, Math.min(5, value));
  }

  updatePopularityScore(): void {
    // Calculate popularity based on employee count and project count
    let score = 0;

    // Employee count factor (0-2 points)
    if (this.employeeCount >= 50) score += 2;
    else if (this.employeeCount >= 20) score += 1.5;
    else if (this.employeeCount >= 10) score += 1;
    else if (this.employeeCount >= 5) score += 0.5;

    // Project count factor (0-2 points)
    if (this.projectCount >= 30) score += 2;
    else if (this.projectCount >= 15) score += 1.5;
    else if (this.projectCount >= 8) score += 1;
    else if (this.projectCount >= 3) score += 0.5;

    // Demand factor (0-1 point)
    if (this.isInDemand) score += 1;

    this.popularityScore = Math.min(5, score);
  }

  markAsInDemand(): void {
    this.isInDemand = true;
    this.updatePopularityScore();
  }

  markAsNotInDemand(): void {
    this.isInDemand = false;
    this.updatePopularityScore();
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  markAsCertification(): void {
    this.isCertification = true;
    this.category = SkillCategory.CERTIFICATION;
  }

  getSkillScore(): number {
    let score = 0;

    // Market value (40%)
    score += (this.marketValue / 5) * 40;

    // Popularity (30%)
    score += (this.popularityScore / 5) * 30;

    // Demand (20%)
    if (this.isInDemand) score += 20;

    // Employee adoption (10%)
    if (this.employeeCount >= 20) score += 10;
    else if (this.employeeCount >= 10) score += 8;
    else if (this.employeeCount >= 5) score += 6;
    else if (this.employeeCount >= 2) score += 4;
    else if (this.employeeCount >= 1) score += 2;

    return Math.round(score);
  }

  getSkillGrade(): string {
    const score = this.getSkillScore();
    if (score >= 90) return "A+";
    if (score >= 85) return "A";
    if (score >= 80) return "B+";
    if (score >= 75) return "B";
    if (score >= 70) return "C+";
    if (score >= 65) return "C";
    if (score >= 60) return "D";
    return "F";
  }

  getSkillType(): string {
    if (this.isHighValue() && this.isPopular()) return "Skill Estrella";
    if (this.isHighValue() && this.isSpecialized())
      return "Skill Especializada";
    if (this.isPopular() && this.isCommon()) return "Skill Fundamental";
    if (this.isEmerging()) return "Skill Emergente";
    if (this.isLegacy()) return "Skill Legacy";
    return "Skill Estándar";
  }

  getCareerImpact(): string {
    if (this.isHighValue() && this.isInDemand) return "Crítico para carrera";
    if (this.isHighValue() || this.isInDemand) return "Importante para carrera";
    if (this.isPopular()) return "Útil para carrera";
    if (this.isSpecialized()) return "Nicho especializado";
    return "Complementario";
  }

  getLearningRecommendation(): string {
    if (this.isHighValue() && this.isInDemand && this.employeeCount < 10) {
      return "Prioridad alta - Aprende ahora";
    }
    if (this.isEmerging()) {
      return "Considera aprender - Tecnología emergente";
    }
    if (this.isPopular() && this.employeeCount < 5) {
      return "Recomendado - Skill popular con poca competencia interna";
    }
    if (this.isLegacy()) {
      return "Mantener - Skill legacy para mantenimiento";
    }
    return "Opcional - Según necesidades del proyecto";
  }

  validateSkill(): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (!this.name || this.name.trim() === "") {
      errors.push("Nombre de la habilidad es obligatorio");
    }

    if (this.marketValue < 0 || this.marketValue > 5) {
      errors.push("Valor de mercado debe estar entre 0 y 5");
    }

    if (this.popularityScore < 0 || this.popularityScore > 5) {
      errors.push("Puntuación de popularidad debe estar entre 0 y 5");
    }

    if (this.averageExperience < 0) {
      errors.push("Experiencia promedio no puede ser negativa");
    }

    if (this.employeeCount < 0) {
      errors.push("Cantidad de empleados no puede ser negativa");
    }

    if (this.projectCount < 0) {
      errors.push("Cantidad de proyectos no puede ser negativa");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getSkillProfile(): string {
    const sections = [
      `🎯 ${this.getSkillSummary()}`,
      `📊 ${this.getSkillMetrics()}`,
      `💰 ${this.getSkillValue()}`,
      `🏷️ Tipo: ${this.getSkillType()}`,
      `🚀 Impacto: ${this.getCareerImpact()}`,
      `📚 Recomendación: ${this.getLearningRecommendation()}`,
      `📈 Grado: ${this.getSkillGrade()} (${this.getSkillScore()}/100)`,
    ];

    if (this.description) sections.push(`📝 ${this.description}`);
    if (this.getSkillDetails()) sections.push(`ℹ️ ${this.getSkillDetails()}`);

    return sections.join("\n");
  }

  toString(): string {
    return `Skill(${this.name}, ${this.getCategoryDisplayName()})`;
  }
}
