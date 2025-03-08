import Post from '../models/Post';
import dbConnect from '../connection/connectMongo';
import { PostType } from '../types/utiles';

class PostService {
  constructor() {
    this.connect(); 
  }

  async connect() {
    await dbConnect();
  }

   getPosts = async () => {
    const posts = await Post.find();
    return posts;
  }

  getPost = async(id: string) => {
    const post = await Post.findOne({ _id: id });
    return post;
  }

   createPost = async(postData: PostType ) => {
    // const { name } = postData;
    // const result = await Post.findOneAndUpdate(
    //   { name },                      
    //   { $set: postData },           
    //   { upsert: true, new: true }    
    // );
    const result = await Post.insertOne(postData);
    return result;
  }

  updatePost = async(id: string, postData: PostType )=>  {
    const result = await Post.updateOne({ _id: id }, { $set: postData });
    return result;
  }

  deletePost = async(id: string) => {
    await Post.deleteOne({ _id: id });
  }
}

export default PostService;