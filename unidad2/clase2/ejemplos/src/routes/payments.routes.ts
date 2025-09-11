import { Router } from "express";
import { paymentsController } from "../controllers/payments.controller";

export const router = Router();

router.post("/", paymentsController.create);
