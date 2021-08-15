import { validationResult } from "express-validator";
import PaymentSourceModel from "../models/paymentSource.js";

export const addPaymentSource = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors,
      });
    }

    const { name, paymentTypeId } = req.body;
    const paymentSource = new PaymentSourceModel({
      name,
      paymentTypeId,
    });
    const result = await paymentSource.save();
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const getPaymentSources = async (req, res, next) => {
  try {
    const paymentSources = await PaymentSourceModel.find();
    return res.status(200).json({
      paymentSources,
    });
  } catch (error) {
    return next(error);
  }
};
