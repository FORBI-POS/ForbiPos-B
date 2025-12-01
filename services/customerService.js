const Customer = require('../models/Customer');
const notificationService = require('./notificationService');

const createCustomer = async (customerData) => {
    const customer = new Customer(customerData);
    return await customer.save();
};

const getAllCustomers = async () => {
    return await Customer.find({ deletedAt: null });
};

const getCustomerById = async (id) => {
    return await Customer.findById(id);
};

const updateCustomer = async (id, updateData) => {
    return await Customer.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCustomer = async (id) => {
    const customer = await Customer.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    if (customer) {
        await notificationService.notifyItemDeleted('Customer', customer.name, id);
    }
    return customer;
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
