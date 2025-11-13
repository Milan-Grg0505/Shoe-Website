import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // This will store the URL or path of the image.
      required: true,
    },
    thumbnails:{
      type:String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Categories",
      required: true,
    },
    featured:{
      type:Boolean,
      required:true,
    },
    topSeller:{
      type:Boolean,
      required:true,
    },
    discountRate :{
      type:Number,
    },
    discountPrice :{
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    stocks: {
      type: Number,
      required: true,
      default: 0,
    },
  }, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  });

  const Product = mongoose.model('Product',productSchema);

  export default Product;
 