// utils/db.ts

/**
 * This utility file handles the MongoDB connection using Mongoose.
 * It's designed to ensure the connection is reused if already established,
 * preventing multiple open connections during development in Next.js.
 */

import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://mongo:27017/stjohnmarondb';

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('[MongoDB] Connected successfully.');
  } catch (error) {
    console.error('[MongoDB] Connection error:', error);
    throw new Error('Could not connect to MongoDB.');
  }
}
