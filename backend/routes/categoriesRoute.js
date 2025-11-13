import express from "express";
import { getCategory,getCategoryById,addCategory,updateCategory,deleteCategory } from "../controller/categoriesController.js";
import { verifyAuth } from "../middleware/auth.js";


const router = express.Router();

router.get('/',getCategory);
router.get('/:id',getCategoryById);
router.post('/add',verifyAuth,addCategory);
router.put('/update/:id',verifyAuth,updateCategory);
router.delete('/delete/:id',verifyAuth,deleteCategory);




export default router;