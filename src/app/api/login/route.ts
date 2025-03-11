
import { UserController } from '../controllers/UserController';
import { NextRequest } from 'next/server';

const userController = new UserController();

export async function POST(req: NextRequest) { 
  return await userController.authenticateUser(req);
}