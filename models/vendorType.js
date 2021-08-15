import mongoose from "mongoose";

const vendorTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("VendorType", vendorTypeSchema);
