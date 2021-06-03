const User = require('../models/user');
const util = require('util');

module.exports = {
    landingPage(req, res, next) {
        const { currentUser } = res.locals;
        if(currentUser) res.redirect('/lists');
        if(!currentUser) res.render('landing');
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
        if (!user && error) {
            req.flash('error', 'Username or password is incorrect.');
            return res.redirect('/login');
        }
        req.login(user, function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/login');
            }
            req.flash('success', `Welcome back, ${username}!`);
            const redirectUrl = req.session.redirectTo || '/lists';
            res.redirect(redirectUrl);
        })
    },
    getLogout(req, res, next) {
        req.logout();
        req.flash('success', 'You have successfully logged out');
        res.redirect('/');
    },
    getSettings(req, res, next) {
        res.render('users/settings');
    },
    async putSettings(req, res, next) {
        const { user } = res.locals;
        const { username, email } = req.body;
        if (username) user.username = username;
        if (email) user.email = email;
        await user.save()
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.flash('success', 'You have succesffuly changed your user information.')
        res.redirect('/settings');
    }
}