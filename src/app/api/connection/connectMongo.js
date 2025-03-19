import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://admin:automobile@localhost:27018/automobile?authSource=admin';
console.log("==============")
console.log(MONGODB_URI)
console.log("==============")
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/** 
 * Cached connection for MongoDB.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;