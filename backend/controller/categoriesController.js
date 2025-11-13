import Categories from "../model/categoriesModel.js";

//Get all categories
export const getCategory = async (req,res) =>{
  try {
  const categories = await Categories.find({});
  res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"failed to get categories"});
  }
};


//get categories by id
export const getCategoryById = async (req,res) =>{
  const {id} = req.params;
  try {
    const category = await Categories.findById(id);
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"failed to get category"});
  }
};

//Add new categories
export const addCategory = async (req,res) =>{
  const {name} = req.body;
  try {
   await Categories.create({name});
    res.status(201).json({message:"successfully added category"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"failed to add category"});
  }
};

//Update categories
export const updateCategory= async (req,res) =>{
  const {id} = req.params;
  const {name} = req.body;

  try {
    await Categories.findByIdAndUpdate(id,{name});
    res.status(200).json({message:"successfully updated category"})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"failed to update category"});
  }
};

//delete categories
export const deleteCategory = async(req,res) =>{
  const {id} = req.params;
  try {
    await Categories.findByIdAndDelete(id);
    res.status(200).json({message:"successfully deleted category"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"failed to delete category"});
  }
};