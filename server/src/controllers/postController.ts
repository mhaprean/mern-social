import { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';
import Joi from 'joi';

export const createPost = async (req: Request<unknown, unknown, IPost>, res: Response) => {
  try {
    const userId = req.userId;

    const joiSchema = Joi.object({
      content: Joi.string().min(3).required(),
      image: Joi.string(),
    });

    const { error } = joiSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const { content, image } = req.body;
    const newPost = { content, user: userId, image };
    const post = await Post.create(newPost);

    return res.status(201).json({ message: 'Post was created!', post });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getPosts = async (req: Request<unknown, unknown, IPost>, res: Response) => {
  try {
    const posts = await Post.find().populate('user').sort({ createdAt: -1 });
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getSinglePost = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id).populate('user');
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getPostLikes = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id).populate('likes', '_id name email image');

    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const likePost = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(400).json({ message: 'Wrong article id.' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'You are not authenticated.' });
    }

    if (post.likes.includes(userId)) {
      const removeLike = await post.updateOne({ $pull: { likes: userId } });
      return res.status(200).json({ message: 'Like removed from post' });
    } else {
      const addLike = await post.updateOne({ $push: { likes: userId } });
      return res.status(200).json({ message: 'Like added to post' });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
