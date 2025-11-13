import express from "express";
import { getUser,getUserById,addUser,updateUser,deleteUser,getOrderByUser,getOrderDetails } from "../controller/userController.js";

const router = express.Router();


router.get('/',getUser);
router.get('/get',getUserById);
router.post('/add',addUser);
router.put('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);
router.get('/order',getOrderByUser);
router.get('/order/:id',getOrderDetails);

export default router;