/**
 * Creates a new post.
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 * @returns {Promise<void>}
 */

import PostService from "../services/PostService";
import { NextRequest, NextResponse } from "next/server";
import { PostType } from "../types/utiles";
import path from "path";
import fs from "fs";
import { isObjectIdOrHexString } from "mongoose";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const uploadFile = async (file: File) => {
  try {
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }
      fs.writeFileSync(
        path.resolve(UPLOAD_DIR, file.name),
        buffer
      );
      console.log("uploaded file", file, "image type", file.type)
      return {
        success: true,
        imageName: file.name,
        type: file.type
      };
    } else {
      return {
        success: false,
        errorMessage: "No file provided"
      };
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      errorMessage: "Error uploading file"
    };
  }
};
export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  getPosts = async () => {
    // Retrieve a list of all Posts
    const posts = await this.postService.getPosts();
   return posts;
  };

  createPost = async (req: NextRequest) => {
    try {
      const formData = await req.formData();
      let name = null;
      let imageType = null;
      const body = Object.fromEntries(formData);
      if(body.image) {
        const file = (body.image as File) || null;
        const { success, imageName, type } = await uploadFile(file);
        name = imageName;
        imageType = type;
        if (!success) {
          return NextResponse.json(
            { message: "Request body is empty or invalid." },
            { status: 400 }
          );
        }
  
        if (!formData) {
          return NextResponse.json(
            { message: "Request body is empty or invalid." },
            { status: 400 }
          );
        }
      }
      const postTobeSaved = {
        name: body.type,
        imageType: imageType,
        data: JSON.stringify({
          ...body,
          image: name,
        }),
      };

      const post = await this.postService.createPost(
        postTobeSaved as unknown as PostType
      );
      return NextResponse.json(post, {
        status: 200,
        statusText: "Post created successfully",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  updatePost = async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id") as string;
    const postData = req.body;

    if (!postData) {
      return NextResponse.json(
        { message: "Request body is empty or invalid." },
        { status: 400 }
      );
    }

    const post = await this.postService.updatePost(
      id,
      postData as unknown as PostType
    );
    return NextResponse.json(post, { status: 200 });
  };

  deletePost = async (req: NextRequest, id: string ) => {   
    // Delete a Post
    // const id = req.nextUrl.searchParams.get("id") as string;
    console.log('deletePost',id);
    await this.postService.deletePost(id);
    return NextResponse.json({
      statusText: "Post deleted successfully",
      status: 200,
    });
  };

  getPostByNameOrId = async (req: NextRequest, param: string) => {
    let post = null;
    if(isObjectIdOrHexString(param)){
      post = await this.postService.getPostById(param);
      return post;
    }
     post = await this.postService.getPostByName(param);
    return post;
  };
}
