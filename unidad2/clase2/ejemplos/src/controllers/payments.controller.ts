import { Request, Response } from "express";
import { Payment, PaymentResponseCache } from "../types";
import { v4 as uuidv4 } from "uuid";

const paymentsByIdemKey: Map<string, PaymentResponseCache> = new Map();

export class PaymentsController {
  create(
    req: Request<{}, {}, { amount: number; currency: string; orderId: string }>,
    res: Response
  ) {
    const idemKey = req.header("Idempotency-Key");
    if (!idemKey)
      return res.status(400).json({
        error: {
          code: "MISSING_IDEMPOTENCY_KEY",
          message: "Idempotency-Key requerido",
        },
      });
    if (paymentsByIdemKey.has(idemKey)) {
      const cached = paymentsByIdemKey.get(idemKey)!;
      return res.status(cached.status).json(cached.body);
    }
    const { amount, currency, orderId } = req.body || {};
    if (!amount || !currency || !orderId)
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "amount, currency, orderId requeridos",
        },
      });
    const payment: Payment = {
      id: `pay_${uuidv4().slice(0, 8)}`,
      amount: Number(amount),
      currency,
      orderId,
      status: "CONFIRMED",
    };
    const response: PaymentResponseCache = { status: 201, body: payment };
    paymentsByIdemKey.set(idemKey, response);
    res.status(201).json(payment);
  }
}

export const paymentsController = new PaymentsController();
