import express from 'express';
const router = express.Router();
import invoiceController from '../controllers/invoiceController.js';

router.post('/', invoiceController.createInvoice);
router.get('/', invoiceController.getAllInvoices);
router.get('/:id', invoiceController.getInvoiceById);
router.delete('/:id', invoiceController.deleteInvoice);

export default router;
