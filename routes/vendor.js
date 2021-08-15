import express from "express";

import * as vendorController from "../controllers/vendor.js";

const router = express.Router();

router.post("/vendor", vendorController.addVendor);

router.get("/vendors", vendorController.getVendors);

export default router;
