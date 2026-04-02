import financialRecordModel from "../models/financialRecordModel.js";

const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "Amount, type, category, and date are required.",
      });
    }

    const record = await financialRecordModel.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Record created successfully.",
      record,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const records = await financialRecordModel
      .find(filter)
      .populate("createdBy", "name email role")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRecordById = async (req, res) => {
  try {
    const record = await financialRecordModel
      .findById(req.params.id)
      .populate("createdBy", "name email role");

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      record,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = await financialRecordModel.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found.",
      });
    }

    if (amount !== undefined) record.amount = amount;
    if (type) record.type = type;
    if (category) record.category = category;
    if (date) record.date = date;
    if (notes !== undefined) record.notes = notes;

    await record.save();

    return res.status(200).json({
      success: true,
      message: "Record updated successfully.",
      record,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const record = await financialRecordModel.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found.",
      });
    }

    await financialRecordModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Record deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};