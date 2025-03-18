# FROM node:20-alpine
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN chown -R 1000:1000 /app/public/uploads
# # Accept build-time environment variables
# ARG MONGODB_URI_ARG
# ARG MONGO_ROOT_PASSWORD_ARG
# ARG NEXT_PUBLIC_API_URL_ARG
# ARG MONGO_ROOT_USERNAME_ARG
# ARG JWT_SECRETE_STRING_ARG

# # Set them as environment variables for runtime
# ENV MONGODB_URI=$MONGODB_URI_ARG
# ENV MONGO_ROOT_PASSWORD=$MONGO_ROOT_PASSWORD_ARG
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL_ARG
# ENV MONGO_ROOT_USERNAME=$MONGO_ROOT_USERNAME_ARG
# ENV JWT_SECRETE_STRING=$JWT_SECRETE_STRING_ARG

# # Debugging: Print env variables
# RUN echo "MONGODB_URI: $MONGODB_URI"
# RUN echo "NEXT_PUBLIC_API_URL: $NEXT_PUBLIC_API_URL"
# RUN echo "MONGO_ROOT_USERNAME: $MONGO_ROOT_USERNAME"
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]

# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy all files
COPY . .

# Ensure proper permissions
RUN chown -R 1000:1000 /app/public/uploads

# Accept build-time arguments
ARG MONGO_URI_ARG
ARG NEXT_PUBLIC_API_URL_ARG
ARG JWT_SECRETE_STRING_ARG

# Set them as runtime environment variables
ENV MONGO_URI=$MONGO_URI_ARG
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL_ARG
ENV JWT_SECRETE_STRING=$JWT_SECRETE_STRING_ARG

# Debugging: Print environment variables
RUN echo "MONGO_URI is set to: $MONGO_URI"
RUN echo "NEXT_PUBLIC_API_URL is set to: $NEXT_PUBLIC_API_URL"

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
