#!/bin/bash

# Start MongoDB
mongod --bind_ip_all --port 27017 &

# Start Next.js
npm start