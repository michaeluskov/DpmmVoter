var express  = require('express'),
    compress = require('compression'),
    hbs      = require('hbs'),
	mongoose = require('mongoose');
    moment   = require('moment'),
    router   = require(__dirname + '/routes'),
    app      = express(),
    error    = require(__dirname + '/middleware/error'),
	session	 = require('express-session'),
	passport = require('passport'),
	VKontakteStrategy = require('passport-vkontakte').Strategy,
	User = require('./models/user'),
    Group = require('./models/group'),
    groupsDb = require('./groups/groupsdb'),
	authRouter = require('./routes/auth'),
    statsRouter = require('./routes/stats');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('dateFormat', function(context, block) {
    var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f);
});

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

mongoose.connect('mongodb://misha:mishamongo@localhost/dpmm2016');

if (app.get('env' == 'development')) {
    mongoose.set('debug', true);
}

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/pages');
app.engine('html', hbs.__express);

app.use(require('cookie-parser')());
app.use(require('body-parser')());
app.use(require('express-session')({ secret: 'FGMKDFK#4mrgnfmj#$mfdkn' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


if (app.get('env') === 'development') {
    app.use('/public', express.static(__dirname + '/public', {maxAge: 86400000}));
}

var domain = 'localhost:3000';
if (app.get('env') == 'production') {
    domain = 'dpmm2016.ru'
}

passport.use(new VKontakteStrategy({
    clientID:     5660180,
    clientSecret: 'pfCRzhtl0dFdNXnp5Xfj',
    callbackURL:  "http://"+ domain + "/auth/vkontakte/cb",
	profileFields: ['first_name', 'last_name', 'photo_100']
  },
  function(accessToken, refreshToken, params, profile, done) {
    User.findOne({ userid: profile.id }, function (err, user) {
	  err && done(err);
	  if (user)
		return done(null, user);
	  var newUser = new User({
		userid: profile.id, 
		name: profile._json.first_name,
		surname: profile._json.last_name,
        picUrl: profile._json.photo_100,
        group: groupsDb[profile.id]
	  });
	  return newUser.save((error) => error ? done(err) : done(null, newUser));
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    err 
      ? done(err)
      : done(null,user);
  });
});

var route = express.Router();

route.get('/testunhexc', () => {GFG()});
route.get('/testexc', (req, res, next) => {next("Handled exception")});
route.get('/testlogging', (req, res) => {
   console.log('LOG');
   res.send('OK');
});

route.get('/index.hbs', function(req, res){
    res.redirect(301, '/');
});
route.use('/auth', authRouter);
route.use('/stats', statsRouter);
route.post('/vote', router.vote);
route.get('/', router.index);

app.use('/', route);

app.use(error.notFound);
app.use(error.logError);
if (app.get('env') != 'development') {
	app.use(error.serverError);
}

module.exports = app;
