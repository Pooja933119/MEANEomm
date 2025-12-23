const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const connectdb = require('./utils/db');
const cors = require('cors');
const authRoute = require('./router/auth-router');
const productRoute = require('./router/product-route');
require('dotenv').config();
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/images',express.static(path.join("backend/images")));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Request-With,Content-Type,Access,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
  next();
});

const corsOptions = {
  origin: 'http://localhost:4200',
  methods:"GET ,POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth',authRoute)
app.use('/api/products',productRoute)

connectdb().then(()=>{
   app.listen(port,()=>{
       console.log(`Server is start : ${port}`)
   })
})
