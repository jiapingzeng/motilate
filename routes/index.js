var express = require('express')
var router = express.Router()

//Makes urls look nice but does not work (if thats what is supposed to do if not JP please change this comment)
router.get('/', (req, res) => {
    res.redirect('/user/login')
})

router.get('/login', (req, res) => { 
    res.redirect('/user/login')
})

router.get('/callback', (req, res) => {
    res.redirect('/user/callback')
})

module.exports = router
