import mongoose, { Document, Model } from 'mongoose';
import { IUserModel } from './User';

export interface IPost {
  content: string;
  image?: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes: string[];
  _doc: Omit<this, '_doc'>; // try to do this in order to acces the _doc object
}

export interface IPostModel extends IPost, Document {}

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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
  },
  { timestamps: true }
);

export default mongoose.model<IPostModel>('Post', postSchema);
