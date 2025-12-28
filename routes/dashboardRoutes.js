import express from 'express';
const router = express.Router();
import dashboardController from '../controllers/dashboardController.js';

router.get('/stats', dashboardController.getStats);

export default router;
