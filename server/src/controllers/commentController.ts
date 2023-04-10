import { Request, Response, NextFunction } from 'express';
import Comment from '../models/Comment';
import Joi from 'joi';
import Reply from '../models/Reply';
import Post from '../models/Post';

export const addComment = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const joiSchema = Joi.object({
      content: Joi.string().min(2).max(60).required(),
      image: Joi.string(),
      postId: Joi.string().hex().length(24),
    });

    const { error } = joiSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const newComment = {
      content: req.body.content,
      post: req.body.postId,
      user: userId,
      image: req.body.image,
    };

    const comment = await Comment.create(newComment);

    const post = await Post.findOneAndUpdate({ _id: req.body.postId }, { $push: { comments: comment._id } });

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const addReply = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const joiSchema = Joi.object({
      content: Joi.string().min(3).max(60).required(),
      image: Joi.string(),
      commentId: Joi.string().hex().length(24),
    });

    const { error } = joiSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error);
    }

    const newReply = {
      content: req.body.content,
      user: userId,
      comment: req.body.commentId,
    };

    const reply = await Reply.create(newReply);

    const comment = await Comment.findOneAndUpdate({ _id: req.body.commentId }, { $push: { replies: reply._id } });

    return res.status(200).json(reply);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getPostComments = async (req: Request<{ id: string }>, res: Response) => {
  const postId = req.params.id;

  try {
    const comments = await Comment.find({ post: postId })
      .populate('user', '_id name email image')
      .populate({
        path: 'replies',
        populate: { path: 'user', select: '_id name email image' },
      });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const likeComment = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id; // comment id
  const userId = req.userId;
  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(400).json({ message: 'Wrong comment id.' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'You are not authenticated.' });
    }

    if (comment.likes.includes(userId)) {
      const removeLike = await comment.updateOne({ $pull: { likes: userId } });
      return res.status(200).json({ message: 'Like removed from comment' });
    } else {
      const addLike = await comment.updateOne({ $push: { likes: userId } });
      return res.status(200).json({ message: 'Like added to comment' });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const likeReply = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id; // comment id
  const userId = req.userId;
  try {
    console.log('reply id: ', id);
    
    const reply = await Reply.findById(id);

    if (!reply) {
      return res.status(400).json({ message: 'Wrong reply id.' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'You are not authenticated.' });
    }

    if (reply.likes.includes(userId)) {
      const removeLike = await reply.updateOne({ $pull: { likes: userId } });
      return res.status(200).json({ message: 'Like removed from comment' });
    } else {
      const addLike = await reply.updateOne({ $push: { likes: userId } });
      return res.status(200).json({ message: 'Like added to comment' });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
