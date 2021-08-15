import mongoose from "mongoose";

const paymentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("PaymentType", paymentTypeSchema);
