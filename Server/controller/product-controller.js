const Products = require('../model/product-model');
const AddToCart = require('../model/AddToCart');
const createProduct = async (req,res) =>{
    try{
        const url = req.protocol + '://' + req.get('host');
        console.log(url);
        const products = new Products({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            image:url + "/images/" + req.file.filename,
            rating: req.body.rating
        })
        products.save().then(product=>{
                res.status(201).json({
                message:'Product Create Successful!!',
                product:{
                    ...product,
                    id:product._id
                }
                
           })
           console.log(product)
        })
        
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const updateProduct = async (req,res) =>{
  try{
      const image = req.body.image;
  //  console.log(image);
    if(req.file){
        const url = req.protocol + "://" + req.get('host')
        this.image = url + "/images/" + req.file.filename
    }
    const id = req.params.id;
    const product = new Products({
        _id:id,
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        price:req.body.price,
        rating:req.body.rating,
        image:this.image
    });
    //console.log(product);
    await Products.updateOne({_id:req.params.id},product)
    .then(result=>{
        if(result.modifiedCount>0){
            res.status(200).json({message:"Update Product Successfully"});
        }else{
            res.status(401).json({message:"Update Product Failed"});
        }
    })
  }catch(error){
   // console.log(error);
    res.status(500).json({message:"Internal Server Error"});
  }
}

const deleteProduct = async (req,res) =>{
   try{
    const id = req.params.id;
    await Products.deleteOne({_id:id});
    return res.status(200).json({message:"Product Deleted Successfully"})
  }catch(error){
   // console.log(error);
  }
}

const getProducts =async (req,res) => {
   try{
        const products =await Products.find();
        if(!products){
            return res.status(404).json({message:"No Product Found"})
        }
        res.status(200).json({products})
   }catch(error){
     //console.log(error);
     res.status(500).json({message:"Internal Server Error"});
   }
}

const getProductById =async (req,res) =>{
   try{
         const id = req.params.id;
         const data = await Products.findOne({_id:id});
         return res.status(200).json(data);
   }catch(error){
       //console.log(error);
       res.status(500).json({message:"Internal Server Error"});
   }
}

const createAddToCart =async (req,res) =>{
   try{
         const products = new AddToCart({
            title: req.body.title,
            price: req.body.price,
            image: req.body.image,
           //image:  url + "/images/" + req.file.filename,
        });
         products.save().then(product=>{
                res.status(201).json({
                message:'Product Added Successful!!',
                product:{
                    ...product,
                    id:product._id
                }
           })
        })
    }catch(error){
       // console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
const getToProductCart =async (req,res) =>{
      try{
         const products = await AddToCart.find();
         if(!products){
            return res.status(404).json({message:"No Products Found"});
         }
         res.status(200).json({products});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
const deleteToCart =async (req,res) => {
   try{
    const id = req.params.id;
    await AddToCart.deleteOne({_id:id});
    return res.status(200).json({message:"Product Deleted Successfully"})
  }catch(error){
    res.status(500).json({message:"Internal Server Error"})
  }
}
module.exports = {createProduct,updateProduct,getToProductCart,deleteToCart,
  deleteProduct,getProducts,getProductById,createAddToCart}