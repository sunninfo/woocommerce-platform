function cartController() {
    return{
        index(req,res){
            res.render('customers/cart')
        }
    }
}
//exporting home module 

module.exports = cartController