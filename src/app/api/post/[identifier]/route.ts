import { NextRequest } from "next/server";
import { PostController } from "../../controllers/PostController";

const postController = new PostController();

export async function DELETE(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const postId = pathname.split('/').pop() as string;
    return await postController.deletePost(req, postId);
  }

  export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;    
    const postIdOrName = pathname.split('/').pop(); 
    return await postController.getPostByNameOrId(req, postIdOrName!);
  }