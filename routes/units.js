import express from "express";
import { body } from "express-validator";

import * as unitsController from "../controllers/units.js";

import UnitsModel from "../models/units.js";

const router = express.Router();

router.post("/units", [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Entered units should be atleast 1 character long")
    .toLowerCase()
    .custom(async (value) => {
      const foundUnits = await UnitsModel.findOne({
        name: value,
      });

      if (foundUnits) {
        return Promise.reject(new Error("Units with same name already exits, please pick a different one"));
      }
      return true;
    }),
], unitsController.addUnits);

router.put("/units/:unitId", [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Entered units should be atleast 1 character long"),
], unitsController.updateUnits);

router.delete("/units/:unitId", unitsController.deleteUnits);

export default router;
