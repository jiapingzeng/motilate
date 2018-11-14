module.exports = () => {
    return (req, res, next) => {
        if (req.user) return next()
        req.session.returnTo = req.originalUrl
        console.log('user not found')
        res.redirect('/user/login')
    }
}