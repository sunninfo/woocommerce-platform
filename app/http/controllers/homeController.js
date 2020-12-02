//we are ussing here factory function which is very power full function
//factory function is a object creational function. its returns the object

const Menu = require('../../models/menu')
function homeController() {
    return{
        index(req,res){

            Menu.find().then(function(pizzas){
                console.log(pizzas)
                return res.render('home',{pizzas:pizzas})
            })
            
        }
    }
}
//exporting home module 

module.exports = homeController