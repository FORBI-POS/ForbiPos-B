# FORBI Billing Backend

A Node.js/Express backend for the FORBI billing and point-of-sale system.

## Features

- Customer management with credit points system
- Invoice and payment processing
- Product and stock management
- Purchase orders and supplier tracking
- Expense tracking
- Role-based access control
- Notification system
- Data backup and restore

## Getting Started

### Prerequisites

- Node.js 14+
- MongoDB

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory with your database and application settings.

### Running the Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Routes

- `/auth` - Authentication endpoints
- `/customers` - Customer management
- `/invoices` - Invoice operations
- `/products` - Product inventory
- `/purchases` - Purchase orders
- `/expenses` - Expense tracking
- `/reports` - Report generation
- `/dashboard` - Dashboard data
- `/payments` - Payment processing
- `/employees` - Employee management
- `/suppliers` - Supplier management
- `/roles` - Role management
- `/settings` - Application settings
- `/notifications` - Notifications
- `/backup` - Data backup/restore

## Project Structure

```
├── controllers/    # Route handlers
├── models/        # Mongoose schemas
├── routes/        # API route definitions
├── services/      # Business logic
├── middleware/    # Custom middleware
├── db.js          # Database connection
└── server.js      # Entry point
```

## License

MIT
