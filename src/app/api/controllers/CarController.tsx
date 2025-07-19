import Car from '../models/Car';
import fs from 'fs';
import path from 'path';

export interface CarData {
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
  const car = new Car(data);
  await car.save();
  return car;
};

export const getCars = async () => {
  return Car.find();
};

export const getCarById = async (id: string) => {
  return Car.findById(id);
};

export const updateCar = async (id: string, data: CarData) => {
  return Car.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCar = async (id: string) => {
  const car = await Car.findByIdAndDelete(id);
  if (car && car.name) {
    const carFolder = path.join(UPLOADS_DIR, car.name);
    if (fs.existsSync(carFolder)) {
      fs.rmSync(carFolder, { recursive: true, force: true });
    }
  }
  return car;
}; 