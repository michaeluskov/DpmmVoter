var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	surname: String,
	userid: {
		type: String,
		unique: true
	},
	picUrl: String,
	group: {
		type: Schema.Types.String,
		ref: 'Group'
	}
});

module.exports = mongoose.model('User', userSchema);
