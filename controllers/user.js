import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const generateToken = (user) => jwt.sign({
  email: user.email,
  name: user.name,
  userId: user._id,
},
"expensetrackermyfirstnodeapp",
{ expiresIn: "20min" });

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      isActive: true,
    });
    const result = await user.save();

    return res.status(201).json({
      token: generateToken(result),
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const foundUser = await UserModel.findOne({
      email,
    });

    if (!foundUser) {
      return res.status(422).json({
        errorMessage: "Email / Password is incorrect.",
      });
    }

    const passwordMatched = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatched) {
      return res.status(422).json({
        errorMessage: "Email / Password is incorrect.",
      });
    }

    return res.status(200).json({
      token: generateToken(foundUser),
    });
  } catch (error) {
    return next(error);
  }
};
