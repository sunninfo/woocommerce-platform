const express = require('express')
//set exprss as a app
const app = express()  //app is a intence of express

const ejs = require('ejs')
const path = require('path')
const expressLayout = require("express-ejs-layouts")

const PORT = process.env.PORT || 3000

//know the server where is our assets

//assets
app.use(express.static('public'))

//set template engine

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))

//express ko btana hai konsa template engine use karenge
app.set('view engine', 'ejs')

require('./routes/web')(app)