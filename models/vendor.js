import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  phoneNumbers: [String],
  website: String,
  vendorTypeId: {
    type: mongoose.Types.ObjectId,
    ref: "VendorType",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Vendor", vendorSchema);
