function guest (req,res , next){
    if(!req.isAuthenticated()){                     //will get "isAuthenticated" from passport its helps to know user is logged-in or not
return next()
    }
    return res.redirect('/')
}



module.exports = guest