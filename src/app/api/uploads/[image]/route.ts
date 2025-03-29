// import { NextApiRequest } from 'next';
// import { NextResponse } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams.get("image") as string;
  console.log("params to get image", params)
  const filePath = path.join(__dirname, 'uploads', params);

  const fileExtension = path.extname(filePath).toLowerCase();
  const fileBuffer = await readFile(filePath);

  console.log("fileExtension", fileExtension, "fileBuffer", fileBuffer)
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