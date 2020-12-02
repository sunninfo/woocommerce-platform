function authController() {
    return{
        login(req,res){
            res.render('auth/login')
        },
//we haver to give "," to separate two objects
        register(req,res){
            res.render('auth/register')
        }
    }
}
//exporting home module 

module.exports = authController