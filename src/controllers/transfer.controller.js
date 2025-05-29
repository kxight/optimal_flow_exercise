const transferService = require('../services/transfer.service');

exports.transfer = async (req, res) => {
  try {
    const { from_user_id, to_user_id, amount, note } = req.body;

    const result = await transferService.transferFunds(from_user_id, to_user_id, amount, note);

    res.status(200).json({ success: true, message: 'Success', data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
