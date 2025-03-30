const express = require('express');
const Router = express.Router();
const passport = require('../configs/passport-local-strategy');
const transactionsController = require('../controllers/transactions');
Router.get('/add/home', passport.checkAuthentication , transactionsController.addTransactionsHome);
Router.post('/addNew', passport.checkAuthentication ,transactionsController.addNewTransaction);
Router.get('/view', passport.checkAuthentication ,transactionsController.viewPage);
Router.post('/getByFilter',passport.checkAuthentication , transactionsController.getTransactions);
module.exports = Router;