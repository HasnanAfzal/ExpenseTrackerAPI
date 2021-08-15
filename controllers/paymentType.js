import PaymentTypeModel from "../models/paymentType.js";

const getPaymentTypes = async (req, res, next) => {
  try {
    const paymentTypes = await PaymentTypeModel.find();
    return res.status(200).json({
      paymentTypes,
    });
  } catch (error) {
    return next(error);
  }
};

export default getPaymentTypes;
