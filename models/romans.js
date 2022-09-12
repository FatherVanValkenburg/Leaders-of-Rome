const { resolveInclude } = require("ejs");
const mongoose = require ("mongoose");
const romanSchema = new mongoose.Schema({
	name: { type: String, required: true },
	role: { type: String, required: true },
	conquering: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("roman",romanSchema)