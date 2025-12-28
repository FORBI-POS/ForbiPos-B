import express from 'express';
const router = express.Router();
import roleController from '../controllers/roleController.js';

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRole);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

export default router;
