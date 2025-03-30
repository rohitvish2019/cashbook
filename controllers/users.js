module.exports.loginPage = function(Req, res) {
    try {
        return res.render('login')
    } catch(err) {
        return res.render('Error')
    }
}

module.exports.createSession = function(req, res) {
    try {
        return res.render('transaction-entry')
    }catch(err) {
        return res.render('Error')
    }
}

module.exports.addTransactionHome = function(req, res) {
    try {
        return res.render('transaction-entry')
    }catch (err) {
        return res.render('Error')
    }
}

module.exports.logout = function(req, res){
    try{
        req.logout(function(err){
            if(err){
                console.log(err)
            return res.redirect('back');
            }
        });
        return res.redirect('/user/login');
    }catch(err){
        console.log(err)
        return res.redirect('back');
    }
}
