import mongoose from 'mongoose';
console.log("env.MONGODB_URI:", process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:automobile@mongodb:27017/automobile?authSource=admin';

console.log("==============")
console.log("MongoDB URI:", MONGODB_URI)
console.log("==============")

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global variable to store the connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If we already have a connection, return it
  if (cached.conn) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  // If we don't have a connection promise, create one
  if (!cached.promise) {
    console.log("Establishing new MongoDB connection...");
    
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 60000,
      connectTimeoutMS: 30000,
      family: 4
    };

    cached.promise = await mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully to:", cached.conn.connection.db.databaseName);
    
    // Handle connection events
    cached.conn.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      cached.conn = null;
      cached.promise = null;
    });

    cached.conn.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cached.conn = null;
      cached.promise = null;
    });

    return cached.conn;
  } catch (error) {
    console.error("Failed to establish MongoDB connection:", error);
    cached.promise = null;
    throw error;
  }
}

export default dbConnect;