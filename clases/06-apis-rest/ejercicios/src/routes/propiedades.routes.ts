import { Router } from "express";
import { propiedadesController } from "../controllers/propiedades.controller";

export const propiedadesRouter = Router();

propiedadesRouter.get("/", propiedadesController.list);
propiedadesRouter.get("/:id", propiedadesController.get);
propiedadesRouter.post("/", propiedadesController.create);
propiedadesRouter.patch("/:id", propiedadesController.update);
propiedadesRouter.delete("/:id", propiedadesController.remove);
