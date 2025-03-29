/**
 * Creates a new post.
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 * @returns {Promise<void>}
 */

import UserService from "../services/UserService";
import { NextRequest, NextResponse } from "next/server";
import { UserType } from "../types/utiles";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public");

export const uploadFile = async (file: Blob) => {
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    fs.writeFileSync(
      path.resolve(UPLOAD_DIR, (file as File).name),
      buffer
    );
    return {
      success: true,
      imageName: (file as File).name,
    };
  } else {
    return {
      imageName: (file as File).name,
      success: false,
    };
  }
};
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUsers = async () => {
    // Retrieve a list of all Posts
    const users = await this.userService.getUsers();
    return NextResponse.json(users, { status: 200 });
  };

  createUser = async (req: NextRequest) => {
    try {
      const formData = await req.json();    
  
        if (!formData) {
            return NextResponse.json(
                { message: "User information is empty or invalid." },
                { status: 400 }
            );
        }
        
        const user = await this.userService.createUser(
            formData as unknown as UserType
            );
        return NextResponse.json(user, {
        status: 200,
        statusText: "User created successfully",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

 

  deleteUser = async (req: NextRequest, id: string ) => {   
    // Delete a Post
    console.log('delet User',id);
    await this.userService.deleteUser(id);
    return NextResponse.json({
      statusText: "User deleted successfully",
      status: 200,
    });
  };

  authenticateUser = async (req: NextRequest) => {
    const body = await req.json();
    const { userName, password } = body;

    console.log('authenticateUser', userName, password);
  
    if (typeof userName !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ message: "InvalidUser." }, { status: 400 });
    }
  
    if (!userName || !password) {
      return NextResponse.json({ message: "InvalidUser." }, { status: 400 });
    }
  
    const user = await this.userService.authUser(userName, password);

    console.log('-----------------------------------');
    console.log('user detials', user);
    console.log('env', process.env);

    console.log('JWT_SECRETE_STRING', process.env.JWT_SECRETE_STRING);
    console.log('-----------------------------------');
    // Generate JWT token
    const token = jwt.sign({ userName: user?.userName, email: user?.email }, process.env.JWT_SECRETE_STRING as string, {
      expiresIn: "1h",
    });
    console.log('generated token', token);
  return NextResponse.json(token, { status: 200, statusText: "User logged in successfully" });
  };
}