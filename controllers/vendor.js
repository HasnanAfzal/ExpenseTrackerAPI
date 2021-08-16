import VendorModel from "../models/vendor.js";

export const addVendor = async (req, res, next) => {
  try {
    const {
      name, address, phoneNumbers, website, vendorTypeId,
    } = req.body;

    const { userId } = req;

    const vendor = VendorModel({
      name, address, phoneNumbers, website, vendorTypeId, userId,
    });

    const result = await vendor.save();

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const getVendors = async (req, res, next) => {
  try {
    const vendors = await VendorModel.find();
    return res.status(200).json({
      vendors,
    });
  } catch (error) {
    return next(error);
  }
};

export default addVendor;
