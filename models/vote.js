var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voteSchema = new Schema({
   group: {
       type: Schema.Types.String,
       ref: 'Group'
   },
    user: {
       type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vote', voteSchema);