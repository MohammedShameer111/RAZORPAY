import express from 'express';
import { getKey, paymentVerification, processPayment } from '../controller/productController.js'; // Ensure the correct path

const router = express.Router();

router.route("/payment/process").post(processPayment);
router.route("/getKey").get(getKey);
router.route("/paymentVerification").post(paymentVerification);
export default router;
