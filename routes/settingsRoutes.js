import express from 'express';
const router = express.Router();
import settingsController from '../controllers/settingsController.js';

router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);

export default router;
