const Transactions = require('../models/transactions');
module.exports.addTransactionsHome = function(reeq, res) {
    try {
        return res.render('transaction-entry')
    }catch (err) {
        return res.render('Error')
    }
}

module.exports.addNewTransaction = function(req, res) {
    console.log(req.body)
    try {
        let transaction = Transactions.create({
            userId:'rohit',
            userName:'Rohit Vishwakarma',
            amount:req.body.Amount,
            date:req.body.Date,
            from:req.body.from,
            to:req.body.to,
            notes:req.body.notes,
            paymentMethod:req.body.paymentMethod
        });
        return res.status(200).json({
            message : "transaction added"
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message:"Unable to add transaction"
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