const User = require('../models/user');

const middleware = {
    catchAsync: (fn) => 
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        },
    isValidPassword: async (req, res, next) => {
        const { user } = await User.authenticate()(req.user.username, req.body.password);
        if (user) {
            res.locals.user = user;
            next();
        } else {
            req.flash('error', 'Password is incorrect');
            return res.redirect('/settings');
        }
    },
    changePassword: async (req, res, next) => {
        const { newPassword, confirmPassword } = req.body;
        if (newPassword && !confirmPassword) {
            req.flash('error', 'Missing password confirmation.');
            return res.redirect('/settings');
        } else if (newPassword && confirmPassword) {
            const { user } = res.locals;
            if (newPassword === confirmPassword) {
                await user.setPassword(newPassword);
                next();
            } else {
                req.flash('error', 'Password and Password Confirmation do not match.');
                return res.redirect('/settings');
            }
        } else {
            next();
        }
    },
    isLoggedIn: (req, res, next) => {
        if (!req.isAuthenticated()) {
            req.session.returnTo = req.originalUrl
            req.flash('error', 'You must be signed in first');
            return res.redirect('/login');
        }
        next();
    }
}

module.exports = middleware;