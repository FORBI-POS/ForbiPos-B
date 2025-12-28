import express from 'express';
const router = express.Router();
import salaryController from '../controllers/salaryController.js';

router.post('/', salaryController.addSalary);
router.get('/', salaryController.getAllSalaries);
router.get('/employee/:id', salaryController.getEmployeeSalaries);
router.get('/month/:month', salaryController.getSalaryByMonth);
router.put('/:id', salaryController.updateSalary);
router.put('/:id/mark-paid', salaryController.markAsPaid);
router.delete('/:id', salaryController.deleteSalary);

export default router;
