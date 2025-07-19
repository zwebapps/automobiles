import Social from "../models/Social";
import dbConnect from "../connection/connectMongo";
import { SocialType } from "../types/utiles";

class SocialService {
  getSocials = async () => {
    await dbConnect();
    const posts = await Social.findOne();
    return posts;
  };

  getSocial = async (id: string) => {
    await dbConnect();
    const post = await Social.findOne({ _id: id });
    return post;
  };

  createSocial = async (postData: SocialType) => {
    await dbConnect();
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
