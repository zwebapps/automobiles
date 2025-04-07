import Social from "../models/Social";
import dbConnect from "../connection/connectMongo";
import { SocialType } from "../types/utiles";

class SocialService {
  constructor() {
    this.connect();
  }

  async connect() {
    await dbConnect();
  }

  getSocials = async () => {
    const posts = await Social.findOne();
    return posts;
  };

  getSocial = async (id: string) => {
    const post = await Social.findOne({ _id: id });
    return post;
  };

  createSocial = async (postData: SocialType) => {
    console.log("createPost", postData);
    const { name } = postData;   
    const result = await Social.findOneAndUpdate(
        { name },
        { $set: postData },
        { upsert: true, new: true }
      );
      return result;
  }; 

}

export default SocialService;
