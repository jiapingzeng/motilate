var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var https = require('https')
var passport = require('passport');

var Auth0Strategy = require('passport-auth0');
var userInViews = require('./middleware/userInViews');
var indexRouter = require('./routers/index');
var authRouter = require('./routers/auth')
var event = require('./routes/event')
// var user = require('./routers/users')
var usersRouter = require('./routers/users')
var session = require('express-session');
// routes


var app = express()
var port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use('/', indexRouter)
// app.use('/event', event)
// app.use('/user', user)

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, function () {
    console.log(`Server is up at port: ${port}!`)
  })



// config express-session
var sess = {
  secret: 'codeDaySecert2018Fall',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));



// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: 'https://codeday2018fall.auth0.com',
    clientID: 'Kp90PfE61zYbNvOqK8IF5vGt1h0WDEWa',
    clientSecret: 'jkorKKZW6iEfuMUm8RufAEvany-J2kh03kB_vRWgVVvdxdoqTh56yuPTxhl5ad-B',
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);

