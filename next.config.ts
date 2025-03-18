import type { NextConfig } from "next";
import dotenv from 'dotenv';
dotenv.config();

const nextConfig: NextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        MONGO_ROOT_USERNAME: process.env.MONGO_ROOT_USERNAME,
        MONGO_ROOT_PASSWORD: process.env.MONGO_ROOT_PASSWORD,
        JWT_SECRETE_STRING: process.env.JWT_SECRETE_STRING
      }
};

export default nextConfig;
