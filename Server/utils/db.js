require('dotenv').config();
const mongoose = require('mongoose');
const URL = process.env.MONGODB_URI;

const connectdb = async () =>{
    try{
          await mongoose.connect(URL);
    }catch(error){
        console.log('Connection Error' + error.message);
    }
}

module.exports = connectdb;