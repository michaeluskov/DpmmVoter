var Vote = require('../models/vote');
var Group = require('../models/group');

module.exports.index = function (req, res, next) {
    return req.isAuthenticated() ?
        module.exports.index_authed(req, res, next) :
        module.exports.index_notauthed(req, res);
};

module.exports.index_authed = function(req, res, next) {
    if (!req.user.group)
        return module.exports.index_notallowedtovote(req, res);
    req.user.populate('group', (err, user) => {
        Vote.findOne({user: req.user._id}).exec()
            .then(vote => {
               vote ?
                   module.exports.index_voted(req, res, vote) :
                   module.exports.index_notvoted(req, res, next);
            })
            .catch(e => next(e));
    });
};

module.exports.index_notallowedtovote = function (req, res) {
    res.render('index', {
        user: req.user,
        caption: 'Увы, тебе нельзя голосовать :(',
        description: 'Скорее всего, тебя нет ни в одной из групп матмеха. Или это ошибка. ' +
        'Тогда прости :('
    });
};

module.exports.index_notvoted = function(req, res, vote, next) {
    Group.find({is_participant: true})
        .then(groups => {
            res.render('vote', {user: req.user, groups: groups});
        })
        .catch(e => next(e));
};

module.exports.index_voted = function(req, res, vote, next) {
    vote.populate('group', (err, vote) => {
        res.render('index', {user: req.user, caption: 'Твой голос за ' + vote.group.readable_name + '!'});
    });
};

module.exports.index_notauthed = function(req, res) {
    res.render('index', {
        caption: 'Привет!',
        description: 'Чтобы проголосовать, войди, используя свою учетную запись ВКонтакте.',
        show_login_button: true
    });
};

var groupsCache;
Group.find({})
    .then(result => {
       groupsCache = {};
       result.forEach(group => groupsCache[group.name] = 1);
    });


module.exports.vote = function (req, res, next) {
    if (!req.isAuthenticated() || req.user.group == req.body.group)
        return res.redirect('/');
    if (groupsCache && !groupsCache[req.body.group])
        return res.redirect('/');
    Vote.findOne({user: req.user._id})
        .then(vote => {
            if (!vote) {
                vote = new Vote({
                    user: req.user._id,
                    group: req.body.group
                });
                return vote.save();
            }
        })
        .then(() => res.redirect('/'))
        .catch(e => next(e));
};

