import { NextRequest, NextResponse } from 'next/server';
import Car from '../../models/Car';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const car = await Car.findOne({ name: name });
  if (!car) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }
  return NextResponse.json(car);
} 