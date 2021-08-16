import ItemModel from "../models/item.js";

export const addItem = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const { userId } = req;

    const item = new ItemModel({
      name,
      categoryId,
      userId,
    });

    const result = await item.save();

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const getAllItems = async (req, res, next) => {
  try {
    const items = await ItemModel.find();

    return res.status(200).json({
      items,
    });
  } catch (error) {
    return next(error);
  }
};

export const getItems = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const items = await ItemModel.find({
      categoryId,
    });

    return res.status(200).json({
      items,
    });
  } catch (error) {
    return next(error);
  }
};
