//Dependencies
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
//passport
var session = require('express-session')
var passport = require('passport')
var userInView = require('./lib/middleware/userInView')
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
    //secure: true
  },
  resave: false,
  saveUninitialized: true
}))

//Initialize passport persistant session 
app.use(passport.initialize())
app.use(passport.session())
app.use(userInView())

app.use('/', index) //Routs default page to index route
app.use('/event', event) //Routs event to event route
app.use('/user', user) // Touts user to user route

app.listen(port)
//Creates the https server
/*
https.createServer({
  key: fs.readFileSync('server.key'), //Gets the key for certification 
  cert: fs.readFileSync('server.cert')
}, app).listen(port, function () {
  console.log(color.green.bold('The server has started on port: ') + `${port}`)
})
*/