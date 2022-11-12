const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
	symbol: { type: String, required: true },
	boughtPrice: { type: Number, required: true },
	date: { type: Date, required: true },
});

module.exports = mongoose.model('Stock', StockSchema);
