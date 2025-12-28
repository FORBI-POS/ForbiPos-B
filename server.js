import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import cookieParser from 'cookie-parser';
import { initializeDefaultRoles } from './controllers/roleController.js';
// Note: Socket.IO and explicit HTTP server were removed to support serverless deployments.
// If real-time sockets are needed, initialize Socket.IO in a dedicated server entrypoint.

// Route imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import backupRoutes from './routes/backupRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import deletedItemsRoutes from './routes/deletedItemsRoutes.js';
import salaryRoutes from './routes/salaryRoutes.js';
import http from "http"

const app = express();
// Middleware
app.use(cors({
    origin:process.env.CLIENT_URL,

    credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/backup', backupRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/deleted', deletedItemsRoutes);
app.use('/api/salaries', salaryRoutes);

export default app;
