//All requirements for this file
var passport = require('passport')
var Auth0Strategy = require('passport-auth0')

//Instance information needed for authentication
var strategy = new Auth0Strategy({
    domain: 'codeday2018fall.auth0.com',
    clientID: 'Kp90PfE61zYbNvOqK8IF5vGt1h0WDEWa',
    clientSecret: 'jkorKKZW6iEfuMUm8RufAEvany-J2kh03kB_vRWgVVvdxdoqTh56yuPTxhl5ad-B',
    callbackURL: 'https://localhost:3000/user/callback'
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