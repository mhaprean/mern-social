import mongoose, { Document } from 'mongoose';

export interface IComment {
  content: string;
  image?: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes: string[];
  replies: string[];
  _doc: Omit<this, '_doc'>;
}

export interface ICommentModel extends IComment, Document {}

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    replies: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Reply',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICommentModel>('Comment', commentSchema);
