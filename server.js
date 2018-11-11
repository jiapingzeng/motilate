var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var fs = require('fs')
var https = require('https')


var app = express()
var port = process.env.PORT || 3000


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, function () {
    console.log(`Example app listening on port ${port}! Go to https://localhost:3000/`)
  })