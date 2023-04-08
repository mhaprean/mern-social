import React, { useState } from 'react';
import { IReply } from '../../redux/apiSlice';
import CommentBase from './CommentBase';

interface IPropsReply {
  reply: IReply;
  isLast?: boolean;
}

const Reply = ({ reply, isLast = false }: IPropsReply) => {
  const [replyOpen, setReplyOpen] = useState(false);

  const handleLikeReply = () => {};

  const replyLiked = false;

  return (
    <div className="flex text-sm text-gray-600 font-semibold relative">
      {!isLast && <div className="absolute h-full ml-4 w-8 border-l-2"></div>}

      <div className="asbolute ml-4 h-8 w-8 rounded-bl-xl border-l-2 border-b-2"></div>
      <CommentBase
        comment={reply}
        replyOpen={replyOpen}
        onReplyOpen={setReplyOpen}
        onLikeComment={handleLikeReply}
        commentLiked={!!replyLiked}
        hasReplies={false}
      />
    </div>
  );
};

export default Reply;
