import mongoose, { Document, Model } from 'mongoose';

export interface IReply {
  content: string;
  image?: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes: string[];
  _doc: Omit<this, '_doc'>;
}

export interface IReplyModel extends IReply, Document {}

const replySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
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

export default mongoose.model<IReplyModel>('Reply', replySchema);
