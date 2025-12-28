import express from 'express';
const router = express.Router();
import deletedItemsController from '../controllers/deletedItemsController.js';

router.get('/', deletedItemsController.getAllDeleted);
router.put('/:model/:id/restore', deletedItemsController.restoreItem);
router.delete('/:model/:id', deletedItemsController.permanentDelete);

export default router;
