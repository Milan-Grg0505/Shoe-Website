import express from "express";
import { getBlog,getBlogById,addBlogs,updateBlogs,deleteBlogs } from "../controller/blogContoller.js";
import multer from "multer";
import { verifyAuth } from "../middleware/auth.js";



const router = express.Router();



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads/blogs");// Ensure the uploads folder exists
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/",getBlog);
router.get("/:id",getBlogById);
router.post("/add",verifyAuth,upload.single("image"),addBlogs);
router.put("/update/:id",verifyAuth,upload.single("image"),updateBlogs);
router.delete("/delete/:id",verifyAuth,deleteBlogs);

export default router;

