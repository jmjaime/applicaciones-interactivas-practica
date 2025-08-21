import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Restaurant } from "./Restaurant";

export enum ChefSpecialty {
  ITALIAN = "italian",
  FRENCH = "french",
  JAPANESE = "japanese",
  MEXICAN = "mexican",
  ARGENTINIAN = "argentinian",
  CHINESE = "chinese",
  MEDITERRANEAN = "mediterranean",
  INDIAN = "indian",
  THAI = "thai",
  FUSION = "fusion"
}

export enum ChefRank {
  SOUS_CHEF = "sous_chef",
  HEAD_CHEF = "head_chef",
  EXECUTIVE_CHEF = "executive_chef",
  MICHELIN_CHEF = "michelin_chef"
}

@Entity()
export class Chef {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  firstName: string;

  @Column({ length: 100, nullable: false })
  lastName: string;

  @Column({ 
    type: "varchar", 
    nullable: false
  })
  specialty: ChefSpecialty;

  @Column({ 
    type: "varchar", 
    default: ChefRank.SOUS_CHEF
  })
  rank: ChefRank;

  @Column({ type: "int", unsigned: true, default: 0 })
  yearsOfExperience: number;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  salary?: number;

  @Column({ type: "text", nullable: true })
  biography?: string;

  @Column({ type: "json", nullable: true })
  awards?: string[]; // Array de premios y reconocimientos

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.00 })
  rating: number; // Rating de 0 a 5

  @Column({ type: "varchar", length: 255, nullable: true })
  profileImage?: string; // URL de la imagen de perfil

  @Column({ type: "json", nullable: true })
  languages?: string[]; // Idiomas que habla

  @Column({ type: "boolean", default: false })
  hasRestaurant: boolean;

  // ===== RELACIONES =====
  
  /**
   * Relación One-to-One con Restaurant
   * Un chef puede ser chef principal de un solo restaurante
   * Un restaurante tiene un solo chef principal
   */
  @OneToOne(() => Restaurant, (restaurant) => restaurant.headChef, {
    cascade: true,
    onDelete: "SET NULL"
  })
  @JoinColumn() // Esta entidad será la "propietaria" de la relación
  restaurant?: Restaurant;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    firstName?: string,
    lastName?: string,
    specialty?: ChefSpecialty,
    email?: string
  ) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.specialty = specialty || ChefSpecialty.FUSION;
    this.email = email || "";
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullName(): string {
    return `Chef ${this.firstName} ${this.lastName}`;
  }

  getSpecialtyDisplayName(): string {
    const specialtyNames: Record<ChefSpecialty, string> = {
      [ChefSpecialty.ITALIAN]: "Cocina Italiana",
      [ChefSpecialty.FRENCH]: "Cocina Francesa",
      [ChefSpecialty.JAPANESE]: "Cocina Japonesa",
      [ChefSpecialty.MEXICAN]: "Cocina Mexicana",
      [ChefSpecialty.ARGENTINIAN]: "Cocina Argentina",
      [ChefSpecialty.CHINESE]: "Cocina China",
      [ChefSpecialty.MEDITERRANEAN]: "Cocina Mediterránea",
      [ChefSpecialty.INDIAN]: "Cocina India",
      [ChefSpecialty.THAI]: "Cocina Tailandesa",
      [ChefSpecialty.FUSION]: "Cocina Fusión"
    };
    return specialtyNames[this.specialty];
  }

  getRankDisplayName(): string {
    const rankNames: Record<ChefRank, string> = {
      [ChefRank.SOUS_CHEF]: "Sous Chef",
      [ChefRank.HEAD_CHEF]: "Chef Principal",
      [ChefRank.EXECUTIVE_CHEF]: "Chef Ejecutivo",
      [ChefRank.MICHELIN_CHEF]: "Chef Estrella Michelin"
    };
    return rankNames[this.rank];
  }

  getExperienceLevel(): string {
    if (this.yearsOfExperience < 2) return "Principiante";
    if (this.yearsOfExperience < 5) return "Junior";
    if (this.yearsOfExperience < 10) return "Intermedio";
    if (this.yearsOfExperience < 15) return "Senior";
    return "Maestro";
  }

  isHighlyRated(): boolean {
    return this.rating >= 4.5;
  }

  calculateAge(): number | null {
    if (!this.birthDate) return null;
    
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  addAward(award: string): void {
    if (!this.awards) {
      this.awards = [];
    }
    if (!this.awards.includes(award)) {
      this.awards.push(award);
    }
  }

  removeAward(award: string): void {
    if (this.awards) {
      this.awards = this.awards.filter(a => a !== award);
    }
  }

  hasAward(award: string): boolean {
    return this.awards ? this.awards.includes(award) : false;
  }

  addLanguage(language: string): void {
    if (!this.languages) {
      this.languages = [];
    }
    if (!this.languages.includes(language)) {
      this.languages.push(language);
    }
  }

  removeLanguage(language: string): void {
    if (this.languages) {
      this.languages = this.languages.filter(l => l !== language);
    }
  }

  speaksLanguage(language: string): boolean {
    return this.languages ? this.languages.includes(language) : false;
  }

  updateRating(newRating: number): void {
    if (newRating >= 0 && newRating <= 5) {
      this.rating = newRating;
    }
  }

  assignToRestaurant(restaurant: Restaurant): void {
    this.restaurant = restaurant;
    this.hasRestaurant = true;
  }

  removeFromRestaurant(): void {
    this.restaurant = undefined;
    this.hasRestaurant = false;
  }

  canManageRestaurant(): boolean {
    return this.rank === ChefRank.HEAD_CHEF || 
           this.rank === ChefRank.EXECUTIVE_CHEF || 
           this.rank === ChefRank.MICHELIN_CHEF;
  }

  getTotalAwards(): number {
    return this.awards ? this.awards.length : 0;
  }

  getLanguageCount(): number {
    return this.languages ? this.languages.length : 0;
  }
} 