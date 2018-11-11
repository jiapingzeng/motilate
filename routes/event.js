var express = require('express')
var router = express.Router()

router.get('/add', (req, res) => {
    res.render('create')
})

module.exports = router