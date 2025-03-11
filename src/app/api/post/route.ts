import { PostController } from '../controllers/PostController';
import { NextRequest, NextResponse } from 'next/server';

const postController = new PostController();

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req.body, res.body);
  return await postController.getPosts();
}

export async function POST(req: NextRequest) {
  return await postController.createPost(req);
}

export async function PUT(req: NextRequest) {  
  return await postController.updatePost(req);
}
