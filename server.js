const express = require('express')
//set exprss as a app
const app = express()

const ejs = require('ejs')
const path = require('path')
const expressLayout = require("express-ejs-layouts")

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.render('home');

})

//set template engine

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))

//express ko btana hai konsa template engine use karenge
app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log('listening port no 3000')
});