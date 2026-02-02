// ==================== MongoDB Connection Caching ====================
// Vercel Serverless এর জন্য connection caching
import mongoose from 'mongoose';
import config from './index';

interface CachedConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        console.log('🔌 Connecting to MongoDB...');
        cached.promise = mongoose.connect(config.database_url, opts).then((mongoose) => {
            console.log('✅ MongoDB Connected');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error('❌ MongoDB Connection Error:', error);
        throw error;
    }

    return cached.conn;
}
