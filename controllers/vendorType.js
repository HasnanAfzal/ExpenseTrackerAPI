import VendorTypeModel from "../models/vendorType.js";

const getVendorTypes = async (req, res, next) => {
  try {
    const vendorTypes = await VendorTypeModel.find();
    return res.status(200).json({
      vendorTypes,
    });
  } catch (error) {
    return next(error);
  }
};

export default getVendorTypes;
