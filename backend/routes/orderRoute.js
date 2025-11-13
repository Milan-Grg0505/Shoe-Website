import express from "express";
import { addOrder, deleteOrder, getOrder, getOrderById, updatePaymentStatus,cancelOrder, updateOrder } from "../controller/orderController.js";

const router = express.Router();

router.get('/',getOrder);
router.get('/:id',getOrderById);
router.post('/add',addOrder);
router.delete('/delete/:id',deleteOrder);
router.put('/update/:id',updatePaymentStatus);
router.put('/cancel/:id',cancelOrder);
router.put('/updateOrder/:id',updateOrder);

export default router;