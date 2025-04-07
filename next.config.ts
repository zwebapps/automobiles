import type { NextConfig } from "next";
import dotenv from 'dotenv';
dotenv.config();

const nextConfig: NextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        MONGO_ROOT_USERNAME: process.env.MONGO_ROOT_USERNAME,
        MONGO_ROOT_PASSWORD: process.env.MONGO_ROOT_PASSWORD,
        JWT_SECRETE_STRING: process.env.JWT_SECRETE_STRING || 'M7IVjrBGWWxST6YSO0GWYI98qvfd0r5bhr9dNPwlw2Q=',
        TINY_MICE_API_KEY: process.env.TINY_MICE_API_KEY
      },
   images: {
     disableStaticImages: true,
     path: '/uploads',
     loader: 'custom',
   }
};

export default nextConfig;
