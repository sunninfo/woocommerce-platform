//we are ussing here factory function which is very power full function
//factory function is a object creational function. its returns the object

function homeController() {
    return{
        index(req,res){
            res.render('home')

        }
    }
}
//exporting home module 

module.exports = homeController