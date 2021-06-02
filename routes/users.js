const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  catchAsync, isValidPassword, changePassword,
} = require('../middleware')
const user = require('../controller/user');

// GET landing page.
router.get('/', user.landingPage);

// GET user registration
router.get('/register', user.getRegister);

// POST use registrtion
router.post('/register', catchAsync(user.postRegister));

// GET users login. 
router.get('/login', user.getLogin);

// POST users login
router.post('/login', catchAsync(user.postLogin));

// GET user logout
router.get('/logout', catchAsync(user.getLogout));

// GET user settings
router.get('/settings', catchAsync(user.getSettings));

// PUT user settings
router.put('/settings',
 catchAsync(isValidPassword),
 catchAsync(changePassword),
 catchAsync(user.putSettings)
);

module.exports = router;
