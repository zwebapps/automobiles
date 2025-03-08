import { NextApiResponse } from 'next';
import { PostController } from '../controllers/PostController';
import { NextRequest } from 'next/server';

const postController = new PostController();

export default async function handler(req: NextRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return await postController.getPosts();
    case 'POST':
      return await postController.createPost(req);
    case 'PUT':
      return await postController.updatePost(req);
    case 'DELETE':
      return await postController.deletePost(req);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}