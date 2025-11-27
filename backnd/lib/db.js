// lib/db.js
const mongoose = require("mongoose");


let cached = global._mongooseConn;
if (!cached) cached = global._mongooseConn = { conn: null, promise: null };


const withTimeout = (p, ms = 8000) =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);

async function connectDB() {
  if (cached.conn) {

    return cached.conn;
  }

 
  const uri =
    process.env.MONGODB_URI ||
    (process.env.DATABASE && process.env.DATABASE_PASSWORD
      ? process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
      : null);

  if (!uri) {
    throw new Error(
      "Missing Mongo connection string. Set MONGODB_URI (or DATABASE + DATABASE_PASSWORD)."
    );
  }

  try {

    if (!cached.promise) {
      cached.promise = withTimeout(
        mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000,
        }).then(m => m),
        8000
      );
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}

module.exports = { connectDB };
