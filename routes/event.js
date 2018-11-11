var express = require('express')
var router = express.Router()

router.get('/calendar', (req, res) => {
    res.render('event/calendar')
})

router.get('/create', (req, res) => {
    res.render('event/create')
})

module.exports = router