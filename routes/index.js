var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/create', (req, res) => {
    res.redirect('/event/create')
})

router.get('/login', (req, res) => { 
    res.redirect('/user/login')
})

router.get('/callback', (req, res) => {
    res.redirect('/user/callback')
})

module.exports = router
