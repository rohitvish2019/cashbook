const mongoose = require('mongoose');
const PersonalTransactions = new mongoose.Schema({
    amount:Number,
    date:String,
    from:String,
    to:String,
    notes:String,
    type:String,
    paymentMethod:String,
    currentBalance:Number,
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

const PersonalTransaction = mongoose.model('PersonalTransaction', PersonalTransactions);
module.exports = PersonalTransaction;