// heroController.js

import Hero from "../model/heroModel.js"; // Assuming the model file is named heroModel.js


// Create a new Hero
export const createHero = async (req, res) => {
  try {
    // Handle the file upload and form data
    const { title, subTitle, description, buttonText } = req.body;
    const image = req.file ? req.file.path : null ; 

    // if (!image || !title || !subTitle || !buttonText || !description) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    // const newHero = new Hero({
    //   image,// Save the file path or URL in your DB
    //   title,
    //   subTitle,
    //   description,
    //   buttonText
    // });

    await Hero.create({image,title,subTitle,description,buttonText});
    res.status(201).json({message:"hero image added successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error creating Hero", error: error.message });
  }
};


// Get all Heroes
export const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Heroes", error: error.message });
  }
};

// Get a single Hero by ID
export const getHeroById = async (req, res) => {
  try {
    const { id } = req.params;
    const hero = await Hero.findById(id);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Hero", error: error.message });
  }
};

// Update a Hero by ID
export const updateHero = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, subTitle,description, buttonText } = req.body;

    const updatedHero = await Hero.findByIdAndUpdate(
      id,
      { image, title, subTitle, description,buttonText },
      { new: true, runValidators: true }
    );

    if (!updatedHero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.status(200).json(updatedHero);
  } catch (error) {
    res.status(500).json({ message: "Error updating Hero", error: error.message });
  }
};

// Delete a Hero by ID
export const deleteHero = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHero = await Hero.findByIdAndDelete(id);

    if (!deletedHero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.status(200).json({ message: "Hero deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Hero", error: error.message });
  }
};
