//All requirements for this file
var passport = require('passport')
var Auth0Strategy = require('passport-auth0')

//Instance information needed for authentication
var strategy = new Auth0Strategy({
    domain: process.env.domain,
    clientID: process.env.cID,
    clientSecret: process.env.cS,
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