import Blog from "../model/blogModel.js";
import fs from "fs";

//get all blogs
export const getBlog = async (req,res) =>{
  try {
    const blog = await Blog.find({});
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to get all blogs"});
  }
};

//get single blog
export const getBlogById = async (req,res) => {
  const {id} = req.params;
  try {
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to get blog"});
  }
};

//add blogs
export const addBlogs = async (req,res) =>{
  const {title,description} = req.body;

  const image = req.file ? req.file.path : null ; 

  try {
    await Blog.create({title,image,description});
    res.status(200).json({message:"blog added successfully"});
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to add blog"});
  }
}

export const updateBlogs = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image = req.file ? req.file.path : null ;  // New image path from multer

  try {
    const blog = await Blog.findById(id);
    await Blog.findByIdAndUpdate(id,{title,description});
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }



    // Replace image if a new one is uploaded
    if (image) {
      const oldImage = blog.image;
      blog.image = image;

      // Delete the old image file
      if (oldImage && fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }
    }

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update blog" });
  }
};


//delete blogs
export const deleteBlogs = async (req,res) =>{
  const {id} = req.params;

  try {
    const blog = await Blog.findById(id);
    await Blog.findByIdAndDelete(id);
      if (fs.existsSync(`./${blog.image}`)) {
            fs.unlinkSync(`./${blog.image}`);
          }
       
    res.status(200).json({message:"blog deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"failed to delete blog"});
  }
};