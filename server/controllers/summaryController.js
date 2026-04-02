import financialRecordModel from "../models/financialRecordModel.js";

const getDashboardSummary = async (req, res) => {
  try {
    const allRecords = await financialRecordModel.find();

    const totalIncome = allRecords
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = allRecords
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    const categoryWiseTotals = await financialRecordModel.aggregate([
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          type: "$_id.type",
          total: 1,
        },
      },
    ]);

    const monthlyTrends = await financialRecordModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          type: "$_id.type",
          total: 1,
        },
      },
    ]);

    const recentActivity = await financialRecordModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "name email role");

    return res.status(200).json({
      success: true,
      summary: {
        totalIncome,
        totalExpenses,
        netBalance,
        categoryWiseTotals,
        monthlyTrends,
        recentActivity,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getDashboardSummary };