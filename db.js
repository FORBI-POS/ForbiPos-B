import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || process.env.MONGO_URI;
if (!MONGO_URL) throw new Error('MONGO_URL is not set in environment');

// Cache connection across lambda invocations (helps with serverless / Vercel deployments)
let cached = globalThis._mongoConnection || null;
if (!cached) {
  cached = globalThis._mongoConnection = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 }).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }
  cached.conn = await cached.promise;
  console.log(`MongoDB Connected: ${cached.conn.host}`);
  return cached.conn;
};

export default connectDB;
