var express = require('express')
var router = express.Router()

router.get('/create', (req, res) => {
    res.render('event/create')
})

module.exports = router