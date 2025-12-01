const Product = require('../models/Product');
const notificationService = require('./notificationService');

const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

const getAllProducts = async () => {
    return await Product.find({ deletedAt: null });
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteProduct = async (id) => {
    const product = await Product.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    if (product) {
        await notificationService.notifyItemDeleted('Product', product.name, id);
    }
    return product;
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
