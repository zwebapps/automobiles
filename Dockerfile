FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN chown -R 1000:1000 /app/public/uploads
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]