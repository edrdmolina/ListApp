const User = require('../models/user');

module.exports = {
    landingPage(req, res, next) {
        res.render('landing');
    },
    getRegister(req, res, next) {
        res.render('users/register');
    },
    postRegister(req, res, next) {
        res.send('POST REGISTER')
    },
    getLogin(req, res, next) {
        res.render('users/login');
    },
    postLogin(req, res, next) {
        res.send('POST LOGIN')
    },
    getLogout(req, res, next) {
        res.send('GET LOGOUT')
    }
}