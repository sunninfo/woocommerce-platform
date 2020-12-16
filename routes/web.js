
//importing homeController from homeController.js

const homeController = require("../app/http/controllers/homeController")

const authController = require("../app/http/controllers/authController")

const cartController = require("../app/http/controllers/customers/cartController")

const orderController = require('../app/http/controllers/customers/orderController')

const AdminorderController = require('../app/http/controllers/admin/orderController')


//Middlewares

const guest = require('../app/http/middlewares/guest')

const auth = require('../app/http/middlewares/auth')

const admin = require("../app/http/middlewares/admin")


//we can also import using ES6 using below method

// import homeController from "../app/http/controllers/homeController";

function initRoutes(app) {

    app.get('/',homeController().index)

    //old method

    // app.get('/', (req, res) => {
    //     res.render('home');
    
    // })

    app.get('/login',guest, authController().login)

    app.post('/login',authController().postLogin)

    app.get('/register',guest, authController().register)

    app.post('/register',authController().postRegister)


    app.post('/logout',authController().logout)

    

    app.get('/cart',cartController().index)
    
    app.post('/update-cart',cartController().update)  //update-cart is url from app.js


    //customer routes

    app.post('/orders',auth,orderController().store)

    app.get('/customers/orders',auth, orderController().index)

    //Admin routes

    app.get('/admin/orders',admin, AdminorderController().index)

    
    
    app.listen(3000, () => {
        console.log('listening port no 3000')
    })  
}

//importing module from web.js

module.exports = initRoutes