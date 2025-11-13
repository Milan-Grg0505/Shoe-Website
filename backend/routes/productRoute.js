import express from "express";
import { getProduct,getProductById,addProduct,updateProduct,deleteProduct } from "../controller/productController.js";
import { verifyAuth } from "../middleware/auth.js";

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
})

const upload = multer({storage});



const router = express.Router();

router.get('/',getProduct);
router.get('/:id',getProductById);
router.post('/add',verifyAuth,upload.fields([{name:"image"},{name:"thumbnails"}]),addProduct);
router.put('/update/:id', verifyAuth,upload.fields([{name:"image"},{name:"thumbnails"}]),updateProduct);
router.delete('/delete/:id',verifyAuth,deleteProduct);



export default router;    