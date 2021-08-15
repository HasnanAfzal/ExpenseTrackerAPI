import express from "express";

import * as categoryController from "../controllers/category.js";

const router = express.Router();

router.post("/category", categoryController.addCategory);

router.get("/categories", categoryController.getCategories);

export default router;
