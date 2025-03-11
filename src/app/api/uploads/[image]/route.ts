// import { NextApiRequest } from 'next';
// import { NextResponse } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams.get("image") as string;
  const filePath = path.join(__dirname, 'uploads', params);
  const fileBuffer = await readFile(filePath);
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });
}