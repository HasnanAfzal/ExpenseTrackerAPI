import express from "express";

import * as itemController from "../controllers/item.js";

const router = express.Router();

router.post("/items/:categoryId", itemController.addItem);

router.get("/items", itemController.getAllItems);

router.get("/items/:categoryId", itemController.getItems);

export default router;
