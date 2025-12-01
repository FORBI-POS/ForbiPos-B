const Supplier = require('../models/Supplier');
const notificationService = require('./notificationService');

const createSupplier = async (supplierData) => {
    const supplier = new Supplier(supplierData);
    return await supplier.save();
};

const getAllSuppliers = async () => {
    return await Supplier.find({ deletedAt: null });
};

const getSupplierById = async (id) => {
    return await Supplier.findById(id);
};

const updateSupplier = async (id, updateData) => {
    return await Supplier.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteSupplier = async (id) => {
    const supplier = await Supplier.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    if (supplier) {
        await notificationService.notifyItemDeleted('Supplier', supplier.name, id);
    }
    return supplier;
};

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};
