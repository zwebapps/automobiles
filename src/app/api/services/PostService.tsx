import Post from "../models/Post";
import dbConnect from "../connection/connectMongo";
import { PostType } from "../types/utiles";

class PostService {
  getPosts = async () => {
    await dbConnect();
    const posts = await Post.find();
    return posts;
  };

  getPost = async (id: string) => {
    await dbConnect();
    const post = await Post.findOne({ _id: id });
    return post;
  };

  createPost = async (postData: PostType) => {
    await dbConnect();
    const { name } = postData;
    const notSinglePost = ["listing", "services"];
    let result = null;
    if (!notSinglePost.includes(name)) {
      result = await Post.findOneAndUpdate(
        { name },
        { $set: postData },
        { upsert: true, new: true }
      );
      return result;
    }
    result = await Post.insertOne(postData);
    return result;
  };

  updatePost = async (id: string, postData: PostType) => {
    await dbConnect();
    const result = await Post.updateOne({ _id: id }, { $set: postData });
    return result;
  };

  deletePost = async (id: string) => {
    await dbConnect();
    await Post.deleteOne({ _id: id });
  };

  getPostByName = async (name: string) => {
    await dbConnect();
    const post = await Post.find({ name });
    return post;
  };
  
  getPostById = async (id: string) => {
    await dbConnect();
    const post = await Post.findOne({ _id: id });
    return post;
  };
}

export default PostService;
