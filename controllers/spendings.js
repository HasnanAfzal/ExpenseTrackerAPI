import moment from "moment";

import SpendingModel from "../models/spending.js";
import SpendingsPerVendorModel from "../models/spendingsPerVendor.js";

export const addSpendings = async (req, res, next) => {
  try {
    const {
      vendorId, items, emi, paymentSourceId, deliveryCharges, packingCharges, taxes, spendingDate,
    } = req.body;

    if (!items || !items.length) {
      throw new Error("Cannot add a spending without any items");
    }

    if (!emi) {
      const itemsWithSpendingDate = items.map((item) => ({ ...item, spendingDate }));

      const spendings = await SpendingModel.insertMany(itemsWithSpendingDate, true);

      let totalAmount = 0;
      const spendingIds = spendings.map((r) => {
        totalAmount += r.amount;
        return r._id;
      });

      if (deliveryCharges) {
        totalAmount += deliveryCharges;
      }

      if (packingCharges) {
        totalAmount += packingCharges;
      }

      if (taxes) {
        totalAmount += taxes;
      }

      const spendingsPerVendor = new SpendingsPerVendorModel({
        vendorId,
        spendingIds,
        totalAmount,
        paymentSourceId,
        spendingDate,
      });

      const results = await spendingsPerVendor.save();
      return res.status(200).json(results);
    }

    const {
      duration, startDate, amount,
    } = emi;

    const interestToBePaid = items
      .reduce((currValue, nextValue) => currValue.amount - nextValue.amount, { amount });

    const totalAmount = amount * duration;

    const itemsWithCaculatedEmiAmount = items.map((i) => {
      const emiAmount = i.amount / duration + (i.amount * interestToBePaid);
      const arr = [];
      for (let index = 0; index < duration.length - 1; index += 1) {
        const emiSpendingDate = moment(startDate).add(index, "month");
        arr.push({
          ...i, emiAmount, spendingDate: emiSpendingDate,
        });
      }
      return arr;
    });

    const spendings = await SpendingModel.insertMany(itemsWithCaculatedEmiAmount);

    const spendingIds = spendings.map((r) => r._id);

    const spendingsPerVendor = new SpendingsPerVendorModel({
      vendorId,
      spendingIds,
      totalAmount,
      paymentSourceId,
      spendingDate,
      emi,
    });

    const results = await spendingsPerVendor.save();
    return res.status(200).json(results);
  } catch (error) {
    return next(error);
  }
};

export default addSpendings;
