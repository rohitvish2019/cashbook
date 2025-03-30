const express = require('express');
const Router = express.Router();
const passport = require('../configs/passport-local-strategy')
Router.use('/user', require('./users'));
Router.use('/transactions', require('./transactions'));
Router.get('/', require('../controllers/users').loginPage)
module.exports = Router;