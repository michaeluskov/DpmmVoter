var express = require('express');
var router = express.Router();
var Vote = require('../models/vote');
var Group = require('../models/group');

router.get('/', function (req, res) {
   res.render('stats');
});

router.get('/json', function (req, res, next) {
    var votePromise = Vote.aggregate([
        {
            $group: {
                _id: '$group',  //$region is the column name in collection
                count: {$sum: 1}
            }
        }
    ])
        .exec();
    var groupPromise = Group.find({
        is_participant: true
    }, 'name readable_name').exec();
    Promise.all([groupPromise, votePromise])
        .then(result => {
            var groups = result[0];
            var votes = result[1];
            groups = groups.map(group => {
                var vote = votes.find(vote => vote._id.toLowerCase() == group.name.toLowerCase());
                var votesCount = vote ? vote.count : 0;
                return {
                    name: group.name,
                    readable_name: group.readable_name,
                    votes: votesCount
                }
            });
            groups.sort((a, b) => b.votes - a.votes);
            res.json(groups);
        })
        .catch(e => next(e));
});

module.exports = router;