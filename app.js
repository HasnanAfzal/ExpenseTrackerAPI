import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.js";
import unitsRoutes from "./routes/units.js";
import paymentTypeRoutes from "./routes/paymentType.js";
import paymentSourceRoutes from "./routes/paymentSource.js";
import vendorTypeRoutes from "./routes/vendorType.js";
import vendorRoutes from "./routes/vendor.js";
import categoryRoutes from "./routes/category.js";
import itemRoutes from "./routes/item.js";
import spendingsController from "./routes/spendings.js";

import authMiddleware from "./middlewares/auth.js";

const app = express();

app.use(bodyParser.json()); // application/json

app.use(userRoutes);

app.use(authMiddleware);

app.use(unitsRoutes);
app.use(paymentTypeRoutes);
app.use(paymentSourceRoutes);
app.use(vendorTypeRoutes);
app.use(vendorRoutes);
app.use(categoryRoutes);
app.use(itemRoutes);
app.use(spendingsController);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(500).json({
    exception: error,
  });
});

mongoose.connect("mongodb+srv://expense-tracker-28:c4O7BKYFXYRoyGrT@expensetracker.oh2y7.mongodb.net/MyExpenses?retryWrites=true&w=majority")
  .then(() => {
    app.listen(3000);
  }).catch((err) => {
    console.log(err);
  });
