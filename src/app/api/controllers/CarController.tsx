import Car from '../models/Car';
import fs from 'fs';
import path from 'path';
import dbConnect from '../connection/connectMongo';

export interface CarData {
  _id?: string;
  name: string;
  model?: string;
  price?: number;
  year?: number;
  color?: string;
  description?: Record<string, unknown>; // JSON object
  mainImage?: string;
  galleryImages?: string[];
}

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

export const createCar = async (data: CarData) => {
  await dbConnect();
  const car = new Car(data);
  await car.save();
  return car;
};

export const getCars = async () => {
  console.log("=== getCars called ===");
  try {
    await dbConnect();
    const cars = await Car.find();
    console.log("Database query result:", cars);
    console.log("Number of cars found:", cars?.length || 0);
    return cars;
  } catch (error) {
    console.error("Error in getCars:", error);
    throw error;
  }
};

export const getCarById = async (id: string) => {
  await dbConnect();
  return Car.findById(id);
};

export const updateCar = async (id: string, data: CarData) => {
  await dbConnect();
  return Car.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCar = async (id: string) => {
  await dbConnect();
  const car = await Car.findByIdAndDelete(id);
  if (car && car.name) {
    const carFolder = path.join(UPLOADS_DIR, car.name);
    if (fs.existsSync(carFolder)) {
      fs.rmSync(carFolder, { recursive: true, force: true });
    }
  }
  return car;
}; 