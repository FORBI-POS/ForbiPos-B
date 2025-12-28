import express from 'express';
const router = express.Router();
import { createBackup, restoreBackup, resetDatabase } from '../controllers/backupController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

// All backup routes require authentication and admin role
router.get('/export', protect, authorize('admin', 'Admin'), createBackup);
router.post('/restore', protect, authorize('admin', 'Admin'), restoreBackup);
router.delete('/reset', protect, authorize('admin', 'Admin'), resetDatabase);

export default router;
