import express from "express";
import getPaymentTypes from "../controllers/paymentType.js";

const router = express.Router();

router.get("/paymenttypes", getPaymentTypes);

export default router;
