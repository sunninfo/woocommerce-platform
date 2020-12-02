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


//database connection with server
const url = 'mongodb://localhost/sem5project'

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("database connected...");
}).catch(err => {
    console.log("connection failed")
});
//database connection with server

//session store , we have to use "new" keyword when we are calling class or constructor 
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: "sessions"
})

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



const PORT = process.env.PORT || 8000
//know the server where is our assets


//using flash as amiddleware
app.use(flash())

//assets
app.use(express.static('public'))
app.use(express.json())  //enableing json in express

//global middleware its a normal function
app.use((req, res, next) => {
    res.locals.session = req.session
    next()

})


//set template engine

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))

//express ko btana hai konsa template engine use karenge
app.set('view engine', 'ejs')

require('./routes/web')(app)