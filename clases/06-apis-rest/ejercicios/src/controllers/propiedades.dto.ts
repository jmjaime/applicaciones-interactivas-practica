import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
} from "class-validator";
import { TipoPropiedad, Operacion, Moneda } from "../entities/Propiedad";

// DTO de entrada para POST /api/propiedades. Se valida ANTES de tocar la
// base de datos (misma idea que clases/04-typeorm/ejercicios/src/03-validacion).
//
// TODO: completar los decoradores que faltan para que `validate()` (en
// propiedades.controller.ts) rechace estos casos:
// - `titulo` vacío o ausente
// - `tipo` / `operacion` / `moneda` con un valor fuera del enum correspondiente
// - `precio` <= 0
// - `superficieTotal` <= 0
// - `inmobiliariaId` ausente o no numérico
export class CreatePropiedadDto {
  // TODO: obligatorio, no puede quedar vacío
  titulo!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  // TODO: debe ser uno de los valores de TipoPropiedad
  tipo!: TipoPropiedad;

  // TODO: debe ser uno de los valores de Operacion
  operacion!: Operacion;

  // TODO: numérico, mayor a 0
  precio!: number;

  // TODO: debe ser uno de los valores de Moneda
  moneda!: Moneda;

  @IsString()
  @IsNotEmpty()
  direccion!: string;

  @IsString()
  @IsNotEmpty()
  zona!: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  superficieCubierta?: number;

  // TODO: numérico, mayor a 0
  superficieTotal!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  ambientes?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  dormitorios?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  banios?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  antiguedad?: number;

  // TODO: obligatorio, debe ser un número entero
  inmobiliariaId!: number;
}

// DTO de entrada para PATCH /api/propiedades/:id — mismos campos que
// arriba pero todos opcionales (actualización parcial). Ya resuelto.
export class UpdatePropiedadDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  precio?: number;

  @IsOptional()
  @IsEnum(Moneda)
  moneda?: Moneda;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  direccion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  zona?: string;
}
