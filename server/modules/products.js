const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    productName: String,
    category:[],
    brand: String,
    price: Number,   
    mrp: Number,
    discount: Number 
})

const UserModel = mongoose.model("UserModal", UserSchema)
module.exports = UserModel;