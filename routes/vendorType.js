import express from "express";
import getVendorTypes from "../controllers/vendorType.js";

const router = express.Router();

router.get("/vendortypes", getVendorTypes);

export default router;
