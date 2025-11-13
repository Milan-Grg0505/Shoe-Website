import express from "express";
import multer from "multer";
import {
  createHero,
  getHeroes,
  getHeroById,
  updateHero,
  deleteHero,
} from "../controller/heroController.js";

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads/hero");// Ensure the uploads folder exists
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/add", upload.single("image"), createHero);
router.get("/", getHeroes);
router.get("/:id", getHeroById);
router.put("/edit/:id",upload.single("image"), updateHero);
router.delete("/delete/:id", deleteHero);

export default router;

