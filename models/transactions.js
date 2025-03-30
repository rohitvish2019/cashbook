const mongoose = require('mongoose');
const Transactions = new mongoose.Schema({
    userId:String,
    userName:String,
    amount:Number,
    date:String,
    from:String,
    to:String,
    notes:String,
    paymentMethod:String,
    isCancelled:{
        type:Boolean,
        default:false
    },
    isValid:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
});

const Transaction = mongoose.model('Transaction', Transactions);
module.exports = Transaction;