import { NextRequest } from "next/server";
import { PostController } from "../../controllers/PostController";

const postController = new PostController();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    // const { pathname } = req.nextUrl;
    // const postId = pathname.split('/').pop();
    // console.log('Rceached', postId, id)
    return await postController.deletePost(req, id);
  }