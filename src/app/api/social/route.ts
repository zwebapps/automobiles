import { SocialController } from '../controllers/SocialController';
import { NextRequest, NextResponse } from 'next/server';

const socialController = new SocialController();

export async function GET(req: NextRequest) { 
    console.log('social reached', req.body);
  const post = await socialController.getSocials();
  return NextResponse.json(post, { status: 200 });
}

export async function POST(req: NextRequest) {
    console.log('social reached POST', req.body);
  await socialController.createSocial(req);
  return NextResponse.json({message: 'Social created successfully!'}, { status: 200 });
}