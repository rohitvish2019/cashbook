const express = require('express');
const Router = express.Router();
const UsersController = require('../controllers/users');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const LocalStrategy = require('../configs/passport-local-strategy');

Router.get('/login', UsersController.loginPage);
Router.post('/authenticate', passport.authenticate(
    'local',
    {failureRedirect: '/user/login'},
), UsersController.createSession);

Router.get('/logout', UsersController.logout);


module.exports = Router;