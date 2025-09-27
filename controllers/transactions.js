const Transaction = require("../models/Transaction");

// @desc    Get user transactions
// @route   GET /api/v1/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.find({ user: req.user.id }); // only user's transactions

		return res.status(200).json({
			success: true,
			count: transactions.length,
			data: transactions,
		});
	} catch (err) {
		return res.status(500).json({ success: false, error: "Server Error" });
	}
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Private
exports.addTransaction = async (req, res) => {
	try {
		const { text, amount } = req.body;

		const transaction = await Transaction.create({
			text,
			amount,
			user: req.user.id, // associate with logged-in user
		});

		return res.status(201).json({ success: true, data: transaction });
	} catch (err) {
		if (err.name === "ValidationError") {
			const messages = Object.values(err.errors).map((val) => val.message);
			return res.status(400).json({ success: false, error: messages });
		} else {
			return res.status(500).json({ success: false, error: "Server Error" });
		}
	}
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res) => {
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) {
			return res
				.status(404)
				.json({ success: false, error: "No transaction found" });
		}
		// Only allow user to delete their own transactions
		if (transaction.user.toString() !== req.user.id) {
			return res.status(401).json({ success: false, error: "Not authorized" });
		}

		await Transaction.deleteOne({ _id: transaction._id });

		return res.status(200).json({ success: true, data: {} });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ success: false, error: "Server Error" });
	}
};
