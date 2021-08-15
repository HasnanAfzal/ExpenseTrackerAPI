import express from "express";
import { body } from "express-validator";

import * as paymentSourceController from "../controllers/paymentSource.js";
import PaymentSourceModel from "../models/paymentSource.js";

const router = express.Router();

router.post("/paymentsource",
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Payment source name should be atleast 2 characters long.")
    .custom(async (value) => {
      const foundPaymentSource = await PaymentSourceModel.findOne({
        name: {
          $regex: new RegExp(value, "i"),
        },
      });
      if (foundPaymentSource) {
        return Promise.reject(new Error("Payment source with same name already exits, please pick a differnt one."));
      }
      return true;
    }),
  paymentSourceController.addPaymentSource);

router.get("/paymentsources", paymentSourceController.getPaymentSources);

export default router;
