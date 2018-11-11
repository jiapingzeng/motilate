var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var https = require('https')
var session = require('express-session')
var passport = require('passport')
var userInView = require('./lib/middleware/userInView')
var color = require("cli-color");

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
app.use(session({
  secret: 'dont tell anyone',
  cookie: {
    secure: true
  },
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(userInView())

app.use('/', index)
app.use('/event', event)
app.use('/user', user)

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(port, function () {
  console.log(color.bold(color.green('The server has started on port: ')) +  `${port}`)
  
})