FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN chown -R 1000:1000 /app/public/uploads
RUN echo "MONGODB_URI is set to: $MONGODB_URI"
RUN echo "NEXT_PUBLIC_API_URL is set to: $NEXT_PUBLIC_API_URL"
RUN echo "MONGO_ROOT_USERNAME is set to: $MONGO_ROOT_USERNAME"
RUN echo "JWT_SECRETE_STRING is set to: $JWT_SECRETE_STRING"
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]