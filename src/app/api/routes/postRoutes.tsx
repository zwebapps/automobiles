import { NextApiResponse } from 'next';
import { PostController } from '../controllers/PostController';
import { NextRequest } from 'next/server';

const postController = new PostController();

export default async function handler(req: NextRequest, res: NextApiResponse) {
  console.log("================");
  switch (req.method) {
    case 'GET':
      return await postController.getPosts();
    case 'POST':
      return await postController.createPost(req);
    case 'PUT':
      return await postController.updatePost(req);
    case 'DELETE':
      const id = req.nextUrl.searchParams.get("id") as string;
      return await postController.deletePost(req, id);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}