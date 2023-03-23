import { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';
import Joi from 'joi';

export const createPost = async (req: Request<unknown, unknown, IPost>, res: Response) => {
  try {
    const userId = req.userId;

    const joiSchema = Joi.object({
      content: Joi.string().min(3).max(60).required(),
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
    const userId = req.userId;

    const posts = await Post.find();
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(400).json(error);
  }
};
