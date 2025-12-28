import express from 'express';
const router = express.Router();
import purchaseController from '../controllers/purchaseController.js';

router.post('/', purchaseController.createPurchase);
router.get('/', purchaseController.getAllPurchases);
router.get('/:id', purchaseController.getPurchaseById);
router.delete('/:id', purchaseController.deletePurchase);

export default router;
