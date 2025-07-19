import { NextRequest, NextResponse } from 'next/server';
import { createCar, getCars, updateCar, deleteCar, CarData } from '../controllers/CarController';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export async function GET() {
  console.log("=== Car API GET called ===");
  try {
    console.log("Calling getCars()...");
    const cars = await getCars();
    console.log("Cars returned:", cars);
    console.log("Number of cars:", cars?.length || 0);
    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error in car GET:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const rawName = formData.get('name')?.toString() || 'car';
  const hash = crypto.createHash('md5').update(rawName + Date.now()).digest('hex');
  const folderName = `${rawName.replace(/\s+/g, '_')}_${hash}`;

  async function saveFile(file: File, folder: string, field: string): Promise<string> {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', folder);
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, `${field}-${file.name}`);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    return `/uploads/${folder}/${field}-${file.name}`;
  }

  const data: Record<string, string | File | string[]> = {};
  const galleryImages: string[] = [];
  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      const imagePath = await saveFile(value, folderName, key);
      if (key === 'mainImage') {
        data.mainImage = imagePath;
      } else if (key.startsWith('galleryImage')) {
        galleryImages.push(imagePath);
      }
    } else if (key === 'description') {
      if (typeof value === 'string') {
        try { data.description = JSON.parse(value); } catch { data.description = value; }
      }
    } else {
      if (typeof value === 'string') {
        data[key] = value;
      }
    }
  }
  data.galleryImages = galleryImages;
  data.folderName = folderName;
  const car = await createCar(data as unknown as CarData);
  return NextResponse.json(car);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...update } = data;
  const car = await updateCar(id, update);
  return NextResponse.json(car);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const car = await deleteCar(id);
  return NextResponse.json(car);
} 