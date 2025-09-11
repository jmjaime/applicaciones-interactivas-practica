import { Router } from "express";
import { categoriesController } from "../controllers/categories.controller";

export const router = Router();

router.get("/", categoriesController.list);
router.get("/:id", categoriesController.get);
router.get("/:id/products", categoriesController.products);
