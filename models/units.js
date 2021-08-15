import mongoose from "mongoose";

const unitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Unit", unitsSchema);
