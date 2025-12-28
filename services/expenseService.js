import Expense from '../models/Expense.js';
import notificationService from './notificationService.js';

const createExpense = async (expenseData) => {
    const expense = new Expense(expenseData);
    return await expense.save();
};

const getAllExpenses = async () => {
    return await Expense.find({ deletedAt: null }).sort({ date: -1 });
};

const getExpenseById = async (id) => {
    return await Expense.findById(id);
};

const updateExpense = async (id, updateData) => {
    return await Expense.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteExpense = async (id) => {
    const expense = await Expense.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    if (expense) {
        await notificationService.notifyItemDeleted('Expense', expense.description, id);
    }
    return expense;
};

export default {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
};
