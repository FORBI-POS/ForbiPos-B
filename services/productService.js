import Product from '../models/Product.js';
import notificationService from './notificationService.js';

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

export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
