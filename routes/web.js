
//importing homeController from homeController.js

const homeController = require("../app/http/controllers/homeController")

const authController = require("../app/http/controllers/authController")

const cartController = require("../app/http/controllers/customers/cartController")


//we can also import using ES6 using below method

// import homeController from "../app/http/controllers/homeController";

function initRoutes(app) {

    app.get('/',homeController().index)

    //old method

    // app.get('/', (req, res) => {
    //     res.render('home');
    
    // })

    app.get('/cart',cartController().index)

    app.get('/login',authController().login)

    app.get('/register',authController().register)
    
    
    app.listen(3000, () => {
        console.log('listening port no 3000')
    })  
}

//importing module from web.js

module.exports = initRoutes