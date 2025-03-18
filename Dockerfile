FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN chown -R 1000:1000 /app/public/uploads
# Set environment variables
ARG MONGODB_URI
ARG MONGO_ROOT_PASSWORD
ARG NEXT_PUBLIC_API_URL
ARG MONGO_ROOT_USERNAME
ARG JWT_SECRETE_STRING

# Make variables available at runtime
ENV MONGODB_URI=$MONGODB_URI
ENV MONGO_ROOT_PASSWORD=$MONGO_ROOT_PASSWORD
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV MONGO_ROOT_USERNAME=$MONGO_ROOT_USERNAME
ENV JWT_SECRETE_STRING=$JWT_SECRETE_STRING

# Print environment variables for debugging
RUN printenv | grep MONGO
RUN printenv | grep JWT
RUN printenv | grep NEXT_PUBLIC
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]