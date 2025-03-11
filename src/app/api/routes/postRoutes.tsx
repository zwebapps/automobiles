import { PostController } from '../controllers/PostController';
import { NextRequest, NextResponse } from 'next/server';

const postController = new PostController();

export default async function handler(req: NextRequest) {
  switch (req.method) {
    case 'GET':
      console.log('>>>>authenticate token')
      return await postController.getPosts();
    case 'POST':
      return await postController.createPost(req);
    case 'PUT':
      return await postController.updatePost(req);
    case 'DELETE':
      const id = req.nextUrl.searchParams.get("id") as string;
      return await postController.deletePost(req, id);
    default:
      return NextResponse.json({ status: 403, message: 'Method not allowed' });
    }
}