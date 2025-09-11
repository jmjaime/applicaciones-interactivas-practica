import { Router } from "express";
import { tagsController } from "../controllers/tags.controller";

export const router = Router();

// Tags collection and item
router.get("/", tagsController.list);
router.get("/:id", tagsController.get);
