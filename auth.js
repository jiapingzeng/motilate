//All requirements for this file
var passport = require('passport')
var Auth0Strategy = require('passport-auth0')
const aws = require('aws-sdk');
let s3 = new aws.S3({
    domainStrat: process.env.domain,
    clientIDStrat: process.env.cID,
    clientSecretStrat: process.env.cS,
  });
  
//Instance information needed for authentication
var strategy = new Auth0Strategy({
    domain: domainStrat,
    clientID: clientIDStrat,
    clientSecret: clientSecretStrat,
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