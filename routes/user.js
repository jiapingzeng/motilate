var express = require('express')
var passport = require('passport')
var path = require('path')
var loggedIn = require('../lib/middleware/loggedIn')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('user/index')
})

router.get('/dashboard', loggedIn(), (req, res) => {
    const { _raw, _json, ...userProfile } = req.user
    res.render('user/dashboard', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Dashboard'
    })
})

router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
}), (req, res) => {
    res.redirect('/')
})

router.get('/profile', loggedIn(), (req, res, next) => {
    const { _raw, _json, ...userProfile } = req.user
    res.render('dash', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Profile'
    })
})

router.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user, info) => {
        if (err) return next(err)
        if (!user) return res.redirect('/user/login') //If no user is detected redirect them to the login page
        req.logIn(user, (err) => {
            if (err) return next(err)
            const returnTo = req.session.returnTo
            delete req.session.returnTo
            res.redirect(returnTo || '/user/profile') //Otherwise redirect them to the profile page
        })
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router