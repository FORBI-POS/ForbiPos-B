import Employee from '../models/Employee.js';
import notificationService from './notificationService.js';

const createEmployee = async (employeeData) => {
    const employee = new Employee(employeeData);
    return await employee.save();
};

const getAllEmployees = async () => {
    return await Employee.find({ deletedAt: null });
};

const getEmployeeById = async (id) => {
    return await Employee.findById(id);
};

const updateEmployee = async (id, updateData) => {
    return await Employee.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEmployee = async (id) => {
    const employee = await Employee.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    if (employee) {
        await notificationService.notifyItemDeleted('Employee', employee.name, id);
    }
    return employee;
};

export default {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};
