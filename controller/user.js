const User = require('../models/user');

module.exports = {
    landingPage(req, res, next) {
        res.render('landing');
    },
    getRegister(req, res, next) {
        res.render('users/register');
    },
    async postRegister(req, res, next) {
        try {
            const { email, username, 
                    password, confirmPassword 
                } = req.body;            
            if (password !== confirmPassword) {
                req.flash('error', 'Passwords do not match!');
                res.redirect('/register');
            } else {
                const user = await User.register(new User(req.body), req.body.password)
                req.login(user, err => {
                    if(err) return next(err);
                    req.flash('success', 'Welcome to Note List!')
                    // const redirectUrl = req.session.returnTo || '/lists';
                    delete req.session.returnTo;
                    res.redirect('/lists');
                })
            }
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('/register');
        }
        
    },
    getLogin(req, res, next) {
        res.render('users/login');
    },
    async postLogin(req, res, next) {
        const { username, password } = req.body;
        const { user, error } = await User.authenticate()(username, password);
        if (!user && error) return next(error);
        req.login(user, function (err) {
            if (err) return next(err);
            req.flash('success', `Welcome back, ${username}!`);
            const redirectUrl = req.session.redirectTo || '/lists';
            res.redirect(redirectUrl);
        })
    },
    getLogout(req, res, next) {
        req.logout();
        req.flash('success', 'You have successfully logged out');
        res.redirect('/');
    }
}