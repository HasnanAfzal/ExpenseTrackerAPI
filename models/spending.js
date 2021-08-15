import mongoose from "mongoose";

const spendingSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  unitId: {
    type: mongoose.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  quantity: Number,
  singleUnitPrice: Number,
  amount: {
    type: Number,
    required: true,
  },
  emiAmount: Number,
  spendingDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Spending", spendingSchema);
