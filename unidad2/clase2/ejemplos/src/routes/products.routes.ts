import { Router } from "express";
import { productsController } from "../controllers/products.controller";

export const router = Router();

router.get("/", productsController.list);
router.post("/", productsController.create);
router.get("/:id", productsController.get);
router.patch("/:id", productsController.patch);
router.put("/:id", productsController.put);
router.delete("/:id", productsController.remove);
router.get("/:id/category", productsController.getCategoryOfProduct);
router.get("/:id/tags", productsController.listTags);
router.post("/:id/tags", productsController.linkTag);
router.delete("/:id/tags/:tagId", productsController.unlinkTag);
