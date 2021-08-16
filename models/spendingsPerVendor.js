import mongoose from "mongoose";

const spendingsPerVendorSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  spendingIds: [{
    type: mongoose.Types.ObjectId,
    ref: "Spending",
    required: true,
  }],
  spendingDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  emi: {
    type: {
      duration: {
        type: Number,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      billingDay: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
    required: false,

  },
  paymentSourceId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  deliveryCharges: Number,
  packingCharges: Number,
  taxes: Number,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("SpendingsPerVendor", spendingsPerVendorSchema);
