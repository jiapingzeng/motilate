var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var https = require('https')
var session = require('express-session')
var passport = require('passport')

var Auth0Strategy = require('passport-auth0');
var index = require('./routes/index')
var event = require('./routes/event')
var user = require('./routes/user')
require('./auth.js')

var app = express()
var port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  secret: 'very secret secret',
  cookie: {
    secure: true
  },
  resave: false,
  saveUninitialized: true
}))

app.use('/', index)
app.use('/event', event)
app.use('/user', user)

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(port, function () {
  console.log(`Example app listening on port ${port}! Go to https://localhost:3000/`)
})
