import express from 'express';
const router = express.Router();
import reportController from '../controllers/reportController.js';

router.get('/', reportController.getReport);

export default router;
