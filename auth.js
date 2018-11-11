var passport = require('passport')
var Auth0Strategy = require('passport-auth0')

var strategy = new Auth0Strategy({
    domain: 'codeday.auth0.com',
    clientID: 'pu0iuM0f0FiE7wf7B5Y8xtl2bP4d9SH4',
    clientSecret: 'kccuUk5H90cMhkNhDxmRRCRS7l2Ra4AvnaXx6OKpMKW4NGJ_9H96cqCHFORc6H94',
    callbackURL: 'http://localhost:3000/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile)
})

passport.use(strategy)