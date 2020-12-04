const mongooes = require("mongoose")

const Schema = mongooes.Schema

//calling class Schema in js its called cunstructor
//creating schema

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique: true},
    password:{type:String,required:true},
    role:{type:String, default: 'customer'}
}, { timestamps: true} )

//creating model
// const Menu = mongooes.model("Menu",menuSchema)

//exporting model

module.exports = mongooes.model("User",userSchema)