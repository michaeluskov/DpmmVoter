var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/vkontakte/login', passport.authenticate('vkontakte', {
	successRedirect: '/',
	failureRedirect: '/'
}));

router.get('/vkontakte/cb', passport.authenticate('vkontakte', {
	successRedirect: '/',
	failureRedirect: '/'
}));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;