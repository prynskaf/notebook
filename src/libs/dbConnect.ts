import mongoose, { Mongoose } from "mongoose";

// Ensure the MongoDB URI environment variable is set
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Define the type for the cached object
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global object to include mongoose
declare global {
  var mongoose: MongooseCache; // This must be a `var` and not `let`/`const`
}

// Create the cached object if it doesn't exist
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Assign the cached object to the global object if it doesn't already exist
if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true, // Ensures the new MongoDB connection string parser is used
      useUnifiedTopology: true, // Enables the new unified topology layer
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
      socketTimeoutMS: 45000, // 45 seconds timeout for socket
      maxPoolSize: 10, // Adjust based on your needs
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
