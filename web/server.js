const express = require('express')
var fs = require('fs')
var https = require('https')
const app = express()
//
app.use(express.static('./'))
app.get('/', function (req, res){
    console.log("request sent in")
    res.sendFile('./index.html')
})
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(3000, function () {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/')
  })