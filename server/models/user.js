const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Stock } = require('./stock').schema;

const UserSchema = new Schema({
	username: { type: String, required: true, maxlength: 100 },
	password: { type: String, required: true, minlength: 3 },
	balance: { type: Number, required: true },
	ownedStocks: { type: [Stock], default: undefined },
});

UserSchema.virtual('url').get(() => {
	return '/user/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);
