const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    image:{
        type:Object,
        require:true
    }
});

const AddToCart = new mongoose.model("AddToCart",productSchema);
module.exports = AddToCart;