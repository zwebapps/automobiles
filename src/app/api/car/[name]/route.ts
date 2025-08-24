import { NextRequest, NextResponse } from 'next/server';
import Car from '../../models/Car';
import { deleteCar } from '../../controllers/CarController';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  
  // Check if it's an ObjectId (24 character hex string)
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(name);
  
  let car;
  if (isObjectId) {
    // If it's an ObjectId, find by _id
    car = await Car.findById(name);
  } else {
    // Otherwise, find by name
    car = await Car.findOne({ name: name });
  }
  
  if (!car) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }
  return NextResponse.json(car);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { name } = await params;
    
    // Check if it's an ObjectId (24 character hex string)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(name);
    
    let car;
    if (isObjectId) {
      // If it's an ObjectId, find by _id
      car = await Car.findById(name);
    } else {
      // Otherwise, find by name
      car = await Car.findOne({ name: name });
    }
    
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }
    
    const deletedCar = await deleteCar(car._id.toString());
    return NextResponse.json({ message: 'Car deleted successfully', car: deletedCar });
  } catch (error) {
    console.error('Error deleting car:', error);
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
  }
}
