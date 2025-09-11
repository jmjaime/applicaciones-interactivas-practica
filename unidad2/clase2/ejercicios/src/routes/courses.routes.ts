import { Router } from "express";
import { coursesController } from "../controllers/courses.controller";

export const coursesRouter = Router();

coursesRouter.get("/", coursesController.list);
coursesRouter.get("/:id", coursesController.get);
coursesRouter.post("/", coursesController.create);
coursesRouter.put("/:id", coursesController.replace);
coursesRouter.patch("/:id", coursesController.update);
coursesRouter.delete("/:id", coursesController.remove);
