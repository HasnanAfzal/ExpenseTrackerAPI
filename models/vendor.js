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
});

export default mongoose.model("Vendor", vendorSchema);
