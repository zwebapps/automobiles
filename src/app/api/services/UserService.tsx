import User from "../models/User";
import dbConnect from "../connection/connectMongo";
import { UserType } from "../types/utiles";

class UserService {
  constructor() {
    this.connect();
  }

  async connect() {
    await dbConnect();
  }

  getUsers = async () => {
    const users = await User.find();
    return users;
  };

  getUser = async (id: string) => {
    const user = await User.findOne({ _id: id });
    return user;
  };

  authUser = async (userName: string, password: string) => {
    const user = await User.findOne({ userName, password });
    return user;
  };

  createUser = async (postData: UserType) => {
    const { email } = postData;
    const result = await User.findOneAndUpdate(
      { email },
      { $set: postData },
      { new: true, upsert: true }
    );
    return result;
  };

  updateUser = async (id: string, postData: UserType) => {
    const result = await User.updateOne({ _id: id }, { $set: postData });
    return result;
  };

  deleteUser = async (id: string) => {
    await User.deleteOne({ _id: id });
  };

  getUserByName = async (name: string) => {
    const user = await User.find({ name });
    return user;
  };
  getUserById = async (id: string) => {
    const user = await User.findOne({ _id: id });
    return user;
  };
}

export default UserService;
