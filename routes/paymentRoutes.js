import express from 'express';
const router = express.Router();
import paymentController from '../controllers/paymentController.js';

router.get('/receivables', paymentController.getReceivables);
router.post('/record', paymentController.recordPayment);

export default router;
