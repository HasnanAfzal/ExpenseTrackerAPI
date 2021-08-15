import express from "express";

import * as spendingsController from "../controllers/spendings.js";

const router = express.Router();

router.post("/spendings", spendingsController.addSpendings);

export default router;
