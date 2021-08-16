import mongoose from "mongoose";

const paymentSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  paymentTypeId: {
    type: mongoose.Types.ObjectId,
    ref: "PaymentType",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("PaymentSource", paymentSourceSchema);
