const Transactions = require('../models/transactions');
module.exports.addTransactionsHome = function(reeq, res) {
    try {
        return res.render('transaction-entry')
    }catch (err) {
        return res.render('Error')
    }
}

module.exports.addIncomeHome = function(reeq, res) {
    try {
        return res.render('income-entry')
    }catch (err) {
        return res.render('Error')
    }
}

module.exports.addNewTransaction = async function(req, res) {
    console.log(req.body);
    let lastTransaction = await Transactions.findOne().sort({ _id: -1 }).exec();
    let lastAvailableBalance;
    if(!lastTransaction || lastTransaction == null || lastTransaction == undefined) {
        lastAvailableBalance = 0
    } else {
        lastAvailableBalance = Number(lastTransaction.currentBalance);
    }
    try {
        let transaction = Transactions.create({
            userId:req.user.Mobile,
            userName:req.user.Name,
            amount:req.body.Amount,
            date:req.body.Date,
            from:'Hariom Enterprises',
            to:req.body.to,
            notes:req.body.notes,
            paymentMethod:req.body.paymentMethod,
            type:'debit',
            currentBalance: lastAvailableBalance - Number(req.body.Amount)
        });
        return res.status(200).json({
            message : "transaction added"
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message:"Unable to add expenses"
        })
    }
}

module.exports.addNewIncome = async function(req, res) {
    try {
        let lastTransaction = await Transactions.findOne().sort({ _id: -1 }).exec();
        let lastAvailableBalance;
        if(!lastTransaction || lastTransaction == null || lastTransaction == undefined) {
            lastAvailableBalance = 0
        } else {
            lastAvailableBalance = Number(lastTransaction.currentBalance);
        }
        let transaction = Transactions.create({
            userId:req.user.Mobile,
            userName:req.user.Name,
            amount:req.body.Amount,
            date:req.body.Date,
            from:req.body.from,
            to:'Hariom Enterprises',
            notes:req.body.notes,
            paymentMethod:req.body.paymentMethod,
            type:'credit',
            currentBalance: lastAvailableBalance + Number(req.body.Amount)
        });
        return res.status(200).json({
            message : "transaction added"
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message:"Unable to add income"
        })
    }
}

module.exports.viewPage = function(req,res){
    try{
        return res.render('view-transactions')
    }catch(err){
        return res.render('Error')
    }
}

module.exports.getTransactions = async function(req, res) {
    let transactions;
    try{
        if(req.body.to == 'All') {
            if(req.body.from == 'All') {
                transactions = await Transactions.find({
                    $and:[
                        {date:{$gte:req.body.startDate}},
                        {date : {$lte : req.body.endDate}}
                    ]
                })
            } else {
                transactions = await Transactions.find({
                    $and:[
                        {date:{$gte:req.body.startDate}},
                        {date : {$lte : req.body.endDate}}
                    ],
                    from:req.body.from
                })
            }
        } else {
            if(req.body.from == 'All') {
                transactions = await Transactions.find({
                    $and:[
                        {date:{$gte:req.body.startDate}},
                        {date : {$lte : req.body.endDate}}
                    ],
                    to:req.body.to
                })
            } else {
                transactions = await Transactions.find({
                    $and:[
                        {date:{$gte:req.body.startDate}},
                        {date : {$lte : req.body.endDate}}
                    ],
                    from:req.body.from,
                    to:req.body.to
                })
            }
        } 
        return res.status(200).json({
            transactions
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Unable to get transactions'
        })
    }
}