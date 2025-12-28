import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
