import { validationResult } from "express-validator";
import UnitsModel from "../models/units.js";

export const addUnits = async (req, res, next) => {
  const { name } = req.body;
  const { userId } = req;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const units = new UnitsModel({
    name,
    isActive: true,
    userId,
  });

  try {
    await units.save();
    return res.status(201).json(units);
  } catch (error) {
    return next(error);
  }
};

export const updateUnits = async (req, res, next) => {
  try {
    const { name, isActive } = req.body;
    const { unitId } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const units = await UnitsModel.findById(unitId);

    if (!units) {
      next(new Error("Cannot find the passed units."));
    }

    units.name = name;
    units.isActive = isActive;

    await units.save();
    return res.status(200).json(units);
  } catch (error) {
    return next(error);
  }
};

export const deleteUnits = async (req, res, next) => {
  try {
    const { unitId } = req.params;

    await UnitsModel.findByIdAndRemove(unitId);
    console.log("Deleted");
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
