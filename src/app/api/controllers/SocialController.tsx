/**
 * Creates a new post.
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 * @returns {Promise<void>}
 */

import SocialService from "../services/SocialService";
import { NextRequest, NextResponse } from "next/server";
import { SocialType } from "../types/utiles";



export class SocialController {
  private socialService: SocialService;

  constructor() {
    
    this.socialService = new SocialService();
  }

  getSocials = async () => {
    // Retrieve a list of all Posts
    const posts = await this.socialService.getSocials();
   return posts;
  };

  createSocial = async (req: NextRequest) => {
    try {
      const formData = await req.formData();
      const body = Object.fromEntries(formData);     
      const postTobeSaved = {
        name: body.name,
        data: JSON.stringify({
          ...body
        }),
      };
      const post = await this.socialService.createSocial(
        postTobeSaved as unknown as SocialType
      );
      return NextResponse.json(post, {
        status: 200,
        statusText: "Post created successfully",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

}
