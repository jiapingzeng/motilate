var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

var app = express()
var port = process.env.PORT || 3000
app.listen(port)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})