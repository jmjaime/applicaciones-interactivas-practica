import { Router } from "express";
import {
  createProduct,
  getProductById,
  listProducts,
  removeProduct,
} from "../controllers/products.controller";
import { requireFields } from "../validators/requireFields";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", requireFields(["name", "price", "category"]), createProduct);
router.delete("/:id", removeProduct);

export default router;
