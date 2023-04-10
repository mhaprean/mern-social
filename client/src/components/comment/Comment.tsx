import { Link } from 'react-router-dom';
import { IComment, useLikeCommentMutation } from '../../redux/apiSlice';
import { HandThumbUpIcon as LikeSolidIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../redux/hooks';
import classNames from 'classnames';
import AddReply from './AddReply';
import { useState } from 'react';
import Reply from './Reply';
import CommentBase from './CommentBase';

interface IPropsComment {
  comment: IComment;
}

const Comment = ({ comment }: IPropsComment) => {
  const [replyOpen, setReplyOpen] = useState(false);

  const [showReplies, setShowReplies] = useState(false);

  const [likeComment, response] = useLikeCommentMutation();

  const authState = useAppSelector((state) => state.auth);

  const commentLiked = authState.isAuth && authState.user && comment.likes.includes(authState.user?._id);

  const handleLikeComment = async () => {
    if (response.isLoading) {
      return;
    }

    try {
      const res = await likeComment({ commentId: comment._id, postId: comment.post, userId: authState.user?._id || '' }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="block">
      <CommentBase
        comment={comment}
        replyOpen={replyOpen}
        onReplyOpen={setReplyOpen}
        onLikeComment={handleLikeComment}
        commentLiked={!!commentLiked}
        hasReplies={comment.replies.length > 0}
      />

      {!showReplies && comment.replies.length > 0 && (
        <div className="flex text-sm text-gray-600 font-semibold">
          <div className="ml-4 h-4 w-6 rounded-bl-xl border-l-2 border-b-2 mr-2"></div>
          <button className="hover:underline" onClick={() => setShowReplies(true)}>
            {comment.replies.length} replies
          </button>
        </div>
      )}

      {showReplies &&
        comment.replies.length > 0 &&
        comment.replies.map((reply, idx) => (
          <Reply
            key={reply._id || idx}
            reply={reply}
            isLast={comment.replies.length - 1 === idx}
            userId={authState.user?._id || ''}
            postId={comment.post}
          />
        ))}

      {replyOpen && <AddReply commentId={comment._id} setOpenReply={setReplyOpen} />}
    </div>
  );
};

export default Comment;
