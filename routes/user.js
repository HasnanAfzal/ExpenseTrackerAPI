import express from "express";
import { body } from "express-validator";

import * as userController from "../controllers/user.js";

import UserModel from "../models/user.js";

const router = express.Router();

router.post("/signup", [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name should be atleast 3 characters long"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail()
    .custom(async (value) => {
      const foundUser = await UserModel.findOne({
        email: value,
      });
      if (foundUser) {
        return Promise.reject(new Error("Email already exists, please pick a different one"));
      }
      return true;
    }),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password should be atleast 5 characters long"),
], userController.signUp);

router.post("/login", [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password should be atleast 5 characters long"),
], userController.login);

export default router;
