import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { propiedadesService } from "../services/propiedades.service";
import { CreatePropiedadDto, UpdatePropiedadDto } from "./propiedades.dto";

function validationErrorResponse(res: Response, errors: { property: string; constraints?: Record<string, string> }[]) {
  res.status(400).json({
    error: {
      code: "VALIDATION_ERROR",
      details: errors.map((e) => ({
        field: e.property,
        messages: Object.values(e.constraints ?? {}),
      })),
    },
  });
}

// Sin try/catch: un async handler que rechaza su promesa (NotFoundError,
// ConflictError, o cualquier otro throw) lo atrapa Express 5 solo y lo
// reenvía al error handler centralizado (../middlewares/errorHandler.ts,
// montado en app.ts). En Express 4 esto necesitaba un wrapper aparte.
export class PropiedadesController {
  // TODO: leer `page`/`limit` de req.query (Number(...)), con default
  // page=1 y limit=10 si vienen ausentes o inválidos (NaN, <= 0); si
  // `limit` pedido supera 50, usar 50 como tope. Llamar a
  // propiedadesService.list(page, limit) y responder 200 con
  // `{ items, page, limit, total }`.
  async list(_req: Request, res: Response) {
    res.status(501).json({ error: { code: "NOT_IMPLEMENTED" } });
  }

  async get(req: Request, res: Response) {
    const propiedad = await propiedadesService.get(Number(req.params.id));
    res.status(200).json(propiedad);
  }

  // TODO: convertir req.body a una instancia de CreatePropiedadDto con
  // `plainToInstance(CreatePropiedadDto, req.body)`, correr `validate()`;
  // si hay errores, responder con `validationErrorResponse(res, errors)`
  // y cortar acá. Si es válido, crear con propiedadesService.create(dto)
  // y responder 201 con header `Location: /api/propiedades/:id`.
  async create(_req: Request, res: Response) {
    res.status(501).json({ error: { code: "NOT_IMPLEMENTED" } });
  }

  // TODO: misma validación que create() pero con UpdatePropiedadDto.
  // Llamar a propiedadesService.update(id, dto) y responder 200 con el
  // resultado — no hace falta manejar 404/409 acá, el service lanza
  // NotFoundError/ConflictError y el error handler centralizado los
  // traduce solo.
  async update(_req: Request, res: Response) {
    res.status(501).json({ error: { code: "NOT_IMPLEMENTED" } });
  }

  async remove(req: Request, res: Response) {
    await propiedadesService.remove(Number(req.params.id));
    res.status(204).send();
  }
}

export const propiedadesController = new PropiedadesController();
