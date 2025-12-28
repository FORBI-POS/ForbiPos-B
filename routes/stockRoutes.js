import express from 'express';
const router = express.Router();
import stockController from '../controllers/stockController.js';

router.post('/adjust', stockController.adjustStock);
router.get('/adjustments', stockController.getAdjustments);

export default router;
