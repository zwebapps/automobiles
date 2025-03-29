import { PostController } from '../controllers/PostController';
import { NextRequest, NextResponse } from 'next/server';

const postController = new PostController();

export async function GET(req: NextRequest) { 
  const post = await postController.getPosts();
  console.log('Post requturned', req.body);
  return NextResponse.json(post, { status: 200 });
}

export async function POST(req: NextRequest) {
  await postController.createPost(req);
  return NextResponse.json({message: 'Post created successfully!'}, { status: 200 });
}

export async function PUT(req: NextRequest) {  
  await postController.updatePost(req);
  return NextResponse.json({message: 'Post update successfully!'}, { status: 200 });
}
