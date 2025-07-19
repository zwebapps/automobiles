import User from "../models/User";
import dbConnect from "../connection/connectMongo";
import { UserType } from "../types/utiles";

class UserService {
  getUsers = async () => {
    await dbConnect();
    const users = await User.find();
    return users;
  };

  getUser = async (id: string) => {
    await dbConnect();
    const user = await User.findOne({ _id: id });
    return user;
  };

  authUser = async (userName: string, password: string) => {
    await dbConnect();
    const user = await User.findOne({ userName, password });
    return user;
  };

  createUser = async (postData: UserType) => {
    await dbConnect();
    const { email } = postData;
    const result = await User.findOneAndUpdate(
      { email },
      { $set: postData },
      { new: true, upsert: true }
    );
    return result;
  };

  updateUser = async (id: string, postData: UserType) => {
    await dbConnect();
    const result = await User.updateOne({ _id: id }, { $set: postData });
    return result;
  };

  deleteUser = async (id: string) => {
    await dbConnect();
    await User.deleteOne({ _id: id });
  };

  getUserByName = async (name: string) => {
    await dbConnect();
    const user = await User.find({ name });
    return user;
  };
  
  getUserById = async (id: string) => {
    await dbConnect();
    const user = await User.findOne({ _id: id });
    return user;
  };
}

export default UserService;
