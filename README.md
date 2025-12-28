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

Note: `server.js` now **exports the Express `app` only** (no internal listener) to support serverless deployments (e.g., Vercel). For local development you can create a small entry file (e.g., `local-server.js`) that imports the app and starts the listener:

```js
// local-server.js
import app from './server.js';
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
```

Then run:

```bash
node local-server.js
# or use nodemon for dev: nodemon local-server.js
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

## Vercel deployment

Before deploying to Vercel, add the required environment variables in your Vercel dashboard (Project Settings → Environment Variables):

- `MONGO_URL` — your MongoDB connection string
- `CLIENT_URL` — frontend origin (e.g., `https://forbi-pos.vercel.app`)
- `JWT_SECRET` — secret used to sign JWT tokens

You can either add them manually or store them as Vercel secrets and reference them in `vercel.json` (see placeholders already added).

---

## License

MIT
