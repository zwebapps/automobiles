// import { NextApiRequest } from 'next';
// import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

import { NextRequest, NextResponse } from 'next/server';
import { URL } from 'url';

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const imagePath = url.pathname.split('/').pop();

  
  const filePath = path.join(UPLOAD_DIR, url.pathname.split('/').pop() ?? '');

  if (!filePath) return new NextResponse('Image name not given', { status: 400 });

  console.log("params to get image", imagePath, "filePath", filePath)
  const fileExtension = path.extname(filePath).toLowerCase();
  const fileBuffer = await readFile(filePath);

  const mimeType =
  fileExtension === '.jpg' || fileExtension === '.jpeg'
    ? 'image/jpeg'
    : fileExtension === '.png'
    ? 'image/png'
    : 'image/jpeg';
  if (!mimeType) return new NextResponse('Invalid image format', { status: 400 });
  
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': mimeType,
    },
  });
}