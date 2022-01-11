const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		usn: {
			type: String,
			required: true,
			unique: true
		},
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{ collection: 'users' }
);

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;
