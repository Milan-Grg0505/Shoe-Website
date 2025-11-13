import Product from "../model/productModel.js";
import fs from "fs";
  
//get all products
export const getProduct = async(req,res) =>{
  try {
    const product = await Product.find().populate("category");
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to get all products"});
  }
};

// get single product
export const getProductById = async(req,res) =>{
  const {id} = req.params;
  try {
    const product = await Product.findById(id).populate("category");

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to get product"});
  }
};

//add product
export const addProduct = async(req,res) =>{
  const {name,price,category,featured,topSeller,discountRate,quantity,stocks} = req.body
  const discountPrice = price - (discountRate / 100 * price);

  const image = req.files?.image ? req.files.image[0].path : null ; 
  const thumbnails = req.files?.thumbnails ? req.files.thumbnails.map((file)=> file.path ) : [] ; 

  const thumbnailsString = thumbnails.length > 0 ? thumbnails.join(",") : "";

  try {
    await Product.create({name,price,category,featured,topSeller,discountRate,discountPrice,quantity,stocks,image:image,thumbnails:thumbnailsString});
    res.status(201).json({message:"product added successfully"});
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to add products"});
  }
};

//update product
export const updateProduct = async (req,res) =>{
  const {id} = req.params;
  const {name,price,category,featured,topSeller,discountRate,discountPrice,quantity,stocks} = req.body;
  const image = req.files?.image ? req.files.image[0].path : null;
  const thumbnails = req.files?.thumbnails
    ? req.files.thumbnails.map(file => file.path)
    : [];
  try {
    const product = await Product.findById(id);
    await Product.findByIdAndUpdate(id,{name,price,category,featured,topSeller,discountRate,discountPrice,quantity,stocks});
    if (image) {
      await Product.findByIdAndUpdate(id, { image });
      if (fs.existsSync(`./${product.image}`)) {
        fs.unlinkSync(`./${product.image}`);
      }
    }
    if (thumbnails.length != 0) {
      await Product.findByIdAndUpdate(id, { thumbnails });
      product.thumbnails.map((thumbnail) => {
        if (fs.existsSync(`./${thumbnail}`)) {
          fs.unlinkSync(`./${thumbnail}`)
        }
      });
    }
    res.status(200).json({message:"product updated successfully"});
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to update product"});
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Deleting the product's image file if it exists
    if (product.image && fs.existsSync(`./${product.image}`)) {
      fs.unlinkSync(`./${product.image}`);
    }

    // Deleting thumbnails if they exist and are an array
    if (Array.isArray(product.thumbnails)) {
      product.thumbnails.forEach((thumbnail) => {
        if (fs.existsSync(`./${thumbnail}`)) {
          fs.unlinkSync(`./${thumbnail}`);
        }
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
