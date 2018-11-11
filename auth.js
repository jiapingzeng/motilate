//Dependencies
var passport = require('passport')
var Auth0Strategy = require('passport-auth0')
var config = require('config')

var domain = process.env.domain ? process.env.domain : config.get('domain')
var cID = process.env.cID ? process.env.cID : config.get('cID')
var cS = process.env.cS ? process.env.cS : config.get('cS')

//Instance information needed for authentication
var strategy = new Auth0Strategy({
    domain: domain,
    clientID: cID,
    clientSecret: cS,
    callbackURL: 'https://motilate.herokuapp.com/user/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile)
})

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})