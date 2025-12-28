import Notification from '../models/Notification.js';
import Product from '../models/Product.js';

let io;

const setSocketIo = (socketIo) => {
    io = socketIo;
};

const createNotification = async (notificationData) => {
    const notification = new Notification(notificationData);
    await notification.save();

    if (io) {
        io.emit('new_notification', notification);
    }

    return notification;
};

const getAllNotifications = async () => {
    return await Notification.find().sort({ createdAt: -1 });
};

const getUnreadNotifications = async () => {
    return await Notification.find({ read: false }).sort({ createdAt: -1 });
};

const markAsRead = async (id) => {
    return await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
};

const markAllAsRead = async () => {
    return await Notification.updateMany({ read: false }, { read: true });
};

const deleteNotification = async (id) => {
    return await Notification.findByIdAndDelete(id);
};

// Auto-generate low stock notifications
const checkLowStock = async () => {
    const lowStockProducts = await Product.find({
        $expr: { $lt: ["$stock", "$minStock"] }
    });

    for (const product of lowStockProducts) {
        // Check if notification already exists for this product
        const existingNotification = await Notification.findOne({
            type: 'low_stock',
            relatedId: product._id.toString(),
            read: false
        });

        if (!existingNotification) {
            await createNotification({
                type: 'low_stock',
                title: 'Low Stock Alert',
                message: `${product.name} is running low (${product.stock} left)`,
                priority: 'high',
                relatedId: product._id.toString(),
                relatedType: 'product'
            });
        }
    }
};

const notifyItemDeleted = async (modelName, itemName, relatedId) => {
    await createNotification({
        type: 'deleted_item',
        title: 'Item Deleted',
        message: `${modelName} "${itemName}" has been moved to deleted items.`,
        priority: 'medium',
        relatedId: relatedId.toString(),
        relatedType: modelName.toLowerCase()
    });
};

export default {
    createNotification,
    getAllNotifications,
    getUnreadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    checkLowStock,
    notifyItemDeleted,
    setSocketIo,
};
