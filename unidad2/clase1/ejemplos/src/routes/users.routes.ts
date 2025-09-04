import { Router } from "express";
import {
  createUser,
  getUserById,
  listUsers,
} from "../controllers/users.controller";
import { requireFields } from "../validators/requireFields";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getUserById);
router.post("/", requireFields(["name", "email"]), createUser);

export default router;
