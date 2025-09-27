const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference User model
			required: true,
		},
		text: {
			type: String,
			required: [true, "Please add some text"],
		},
		amount: {
			type: Number,
			required: [true, "Please add a positive or negative number"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
