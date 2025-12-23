const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
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
    },
    rating:{
        type:Number,
        default:true
    }
});

const Products = new mongoose.model("Products",productSchema);
module.exports = Products;