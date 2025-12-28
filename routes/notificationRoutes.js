import express from 'express';
const router = express.Router();
import notificationController from '../controllers/notificationController.js';

router.get('/', notificationController.getAllNotifications);
router.get('/unread', notificationController.getUnreadNotifications);
router.put('/:id/read', notificationController.markAsRead);
router.put('/read-all', notificationController.markAllAsRead);
router.delete('/:id', notificationController.deleteNotification);
router.post('/check-low-stock', notificationController.checkLowStock);

export default router;
