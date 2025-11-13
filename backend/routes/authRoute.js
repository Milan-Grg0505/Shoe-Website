import { register,login, logout,verify} from "../controller/authController.js";
import express from "express";


const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/verify',verify);


export default router