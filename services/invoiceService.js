import Invoice from '../models/Invoice.js';
import Product from '../models/Product.js';
import Customer from '../models/Customer.js';
import notificationService from './notificationService.js';
import Settings from '../models/Settings.js';

const createInvoice = async (invoiceData) => {
    try {
        const invoice = new Invoice(invoiceData);
        await invoice.save();

        // Update product stock
        for (const item of invoice.items) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { stock: -item.qty } }
            );
        }

        // Calculate credit points based on settings
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }

        const creditPointsToAdd = Math.floor(invoice.grandTotal / settings.creditPointsPerAmount);

        // Update customer outstanding, total billing, and credit points
        if (invoice.customer && invoice.balance > 0) {
            await Customer.findByIdAndUpdate(
                invoice.customer,
                {
                    $inc: {
                        outstanding: invoice.balance,
                        totalBilling: invoice.grandTotal,
                        creditPoints: creditPointsToAdd
                    }
                }
            );
        } else if (invoice.customer) {
            await Customer.findByIdAndUpdate(
                invoice.customer,
                {
                    $inc: {
                        totalBilling: invoice.grandTotal,
                        creditPoints: creditPointsToAdd
                    }
                }
            );
        }

        // Check for low stock
        await notificationService.checkLowStock();

        return invoice;
    } catch (error) {
        throw error;
    }
};

const getAllInvoices = async () => {
    return await Invoice.find({ deletedAt: null }).populate('customer', 'name phone');
};

const getInvoiceById = async (id) => {
    return await Invoice.findById(id).populate('customer');
};

const deleteInvoice = async (id) => {
    try {
        const invoice = await Invoice.findById(id);
        if (!invoice) throw new Error('Invoice not found');

        // Reverse product stock
        for (const item of invoice.items) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { stock: item.qty } }
            );
        }

        // Reverse customer stats
        if (invoice.customer) {
            let settings = await Settings.findOne();
            const creditPointsToRemove = settings ? Math.floor(invoice.grandTotal / settings.creditPointsPerAmount) : 0;

            // Safely update customer: decrement outstanding and totalBilling,
            // and ensure creditPoints never becomes negative.
            const customer = await Customer.findById(invoice.customer).lean();
            if (customer) {
                const newCreditPoints = Math.max(0, (customer.creditPoints || 0) - creditPointsToRemove);

                await Customer.findByIdAndUpdate(
                    invoice.customer,
                    {
                        $inc: {
                            outstanding: -invoice.balance,
                            totalBilling: -invoice.grandTotal
                        },
                        $set: {
                            creditPoints: newCreditPoints
                        }
                    }
                );
            }
        }

        // Soft delete the invoice
        await Invoice.findByIdAndUpdate(id, { deletedAt: new Date() });

        // Notify about deletion
        await notificationService.notifyItemDeleted('Invoice', invoice.invoiceNo, id);

        return { message: 'Invoice deleted successfully' };
    } catch (error) {
        throw error;
    }
};

export default {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    deleteInvoice,
};
