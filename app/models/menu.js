const mongooes = require("mongoose")

const Schema = mongooes.Schema

//calling class Schema in js its called cunstructor
//creating schema

const menuSchema = new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    size:{type:String,required:true},
})

//creating model
// const Menu = mongooes.model("Menu",menuSchema)

//exporting model

module.exports = mongooes.model("Menu",menuSchema)