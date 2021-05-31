const express = require('express');
const router = express.Router();
const {
  catchAsync,
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

module.exports = router;
