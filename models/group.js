var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: String,
    name: String,
    readable_name: String,
    description: String,
    is_participant: Boolean
});

module.exports = mongoose.model('Group', userSchema);