const express = require('express');
const router = express.Router();
const { createBackup, restoreBackup, resetDatabase } = require('../controllers/backupController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All backup routes require authentication and admin role
router.get('/export', protect, authorize('admin', 'Admin'), createBackup);
router.post('/restore', protect, authorize('admin', 'Admin'), restoreBackup);
router.delete('/reset', protect, authorize('admin', 'Admin'), resetDatabase);

module.exports = router;
