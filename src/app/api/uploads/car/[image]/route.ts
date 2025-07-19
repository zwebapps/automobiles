import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Car from '../../../models/Car';

export async function POST(req: NextRequest, { params }: { params: { image: string } }) {
  const carName = params.image;
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', carName);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const filePath = path.join(uploadsDir, file.name);
  fs.writeFileSync(filePath, buffer);
  const publicPath = `/uploads/${carName}/${file.name}`;

  // Update Car document
  const car = await Car.findOne({ name: carName });
  if (car) {
    if (!car.mainImage) {
      car.mainImage = publicPath;
    } else {
      if (!car.galleryImages) car.galleryImages = [];
      car.galleryImages.push(publicPath);
    }
    await car.save();
  }

  return NextResponse.json({ path: publicPath });
} 