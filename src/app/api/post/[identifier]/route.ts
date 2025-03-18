import { NextRequest, NextResponse } from "next/server";
import { PostController } from "../../controllers/PostController";

const postController = new PostController();

export async function DELETE(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const postId = pathname.split('/').pop() as string;
    const post =  await postController.deletePost(req, postId);
    return NextResponse.json(post, { status: 200 });
  }

  export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;    
    const postIdOrName = pathname.split('/').pop(); 
    const post = await postController.getPostByNameOrId(req, postIdOrName!);
    return NextResponse.json(post, { status: 200 });
  }