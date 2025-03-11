
import { UserController } from '../controllers/UserController';
import { NextRequest } from 'next/server';

const userController = new UserController();

export async function GET(req: NextRequest) {
  console.log('authenticateUser', req)
  return await userController.authenticateUser(req);
}

export async function POST(req: NextRequest) {
  return await userController.createUser(req);
}
