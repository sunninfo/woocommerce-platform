require('dotenv').config()
const express = require('express')
//set exprss as a app
const app = express()  //app is a intence of express
const ejs = require('ejs')
const path = require('path')
const expressLayout = require("express-ejs-layouts")
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')
const Emitter = require('events')


//database connection with server  start
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("database connected...");
}).catch(err => {
    console.log("connection failed")
});
//database connection with server end



//session store , we have to use "new" keyword when we are calling class or constructor 
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: "sessions"
})

//Eventemmiter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

//session store end


//session config, its working as a middleware
app.use(session({
    //using "secret key" for encrypting Cookies
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 24 }  //cookie life time in miliseconds //24 hours
}))
//session config end

//passport config start 
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//passport config end


const PORT = process.env.PORT || 8000
//know the server where is our assets


//using flash as middleware
app.use(flash())

//assets
app.use(express.static('public'))
app.use(express.json())  //enableing json in express
app.use(express.urlencoded({ extended: false }))

//global middleware its a normal function
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user //we are getting logedin user from session sending it to layout.ejs
    next()

})


//set template engine

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))

//express ko btana hai konsa template engine use karenge
app.set('view engine', 'ejs')

require('./routes/web')(app)
app.use((req,res) =>{
    res.status(404).render('errors/404')
})

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


//Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {

    // Join client in private room
    socket.on('join', (orderId) => {
        socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})
