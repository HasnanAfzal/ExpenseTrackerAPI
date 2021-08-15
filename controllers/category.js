import CategoryModel from "../models/category.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new CategoryModel({
      name,
    });
    const result = await category.save();
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json({
      categories,
    });
  } catch (error) {
    return next(error);
  }
};
