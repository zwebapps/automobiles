// import { NextApiRequest } from 'next';
// import { NextResponse } from 'next/server';

// export const GET = async (req: NextApiRequest) => {
//   console.log(req);
//   return NextResponse.json({ message: 'Hello from Next.js!' });
// };
// export const POST = async (req: NextApiRequest) => {
//   console.log(req);
//   return NextResponse.json({ message: 'POST request reached successfully' });
// };

import { PostController } from '../controllers/PostController';
import { NextRequest } from 'next/server';

const postController = new PostController();

export async function GET(req: NextRequest) {
  console.log(req.body)
  return await postController.getPosts();
}

export async function POST(req: NextRequest) {
  return await postController.createPost(req);
}

export async function PUT(req: NextRequest) {
  return await postController.updatePost(req);
}
