import { Link } from 'react-router-dom';
import { IComment, useLikeCommentMutation } from '../../redux/apiSlice';
import { HandThumbUpIcon as LikeSolidIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../redux/hooks';
import classNames from 'classnames';
import AddReply from './AddReply';
import { useState } from 'react';

interface IPropsComment {
  comment: IComment;
}

const Comment = ({ comment }: IPropsComment) => {
  const [replyOpen, setReplyOpen] = useState(false);

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
      <div className="flex space-x-2">
        <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="Profile" className="rounded-full w-10 h-10" />
        <div className="flex flex-col">
          <div className="rounded-2xl py-1 px-2 bg-slate-100 min-w-[120px] relative">
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                <Link className="hover:underline" to={`/user/${comment.user._id}`}>
                  {comment.user.name}
                </Link>
              </span>

              {/* <span className="text-gray-400 font-bold text-xs">{comment.createdAt}</span> */}
            </div>

            <div className="text-base font-medium pt-2 pb-2 text-gray-600">
              {comment.content.split('\n').map((line, idx) =>
                line.length === 0 ? (
                  <p className="h-2"></p>
                ) : (
                  <p className="mb-2" key={idx}>
                    {line}
                  </p>
                )
              )}
            </div>
          </div>

          {comment.image && (
            <div className="flex flex-col bg-gray-700 my-2 rounded-md">
              <img src={comment.image} alt="" className="object-fill rounded-md" />
            </div>
          )}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={handleLikeComment}
              className={classNames('hover:underline', {
                'text-gray-500 hover:text-gray-700 font-semibold': !commentLiked,
                'text-blue-500 hover:text-blue-700 font-semibold': commentLiked,
              })}
            >
              {commentLiked ? 'Unlike' : 'Like'}
            </button>
            <button
              onClick={() => {
                setReplyOpen(!replyOpen);
              }}
              className="text-gray-500 hover:text-gray-700 hover:underline"
            >
              Reply
            </button>

            {comment.likes.length > 0 && (
              <button
                className="flex items-center rounded-full py-0 px-0.5 bg-slate-50 hover:bg-slate-100
                       border ml-auto mt-[-7px] z-10"
              >
                <span className="p-0.5 rounded-full bg-blue-500">
                  <LikeSolidIcon className="w-3 h-3 text-white" />
                </span>
                <span className="text-sm font-semibold ml-2 mr-1 text-gray-600">{comment.likes.length}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {replyOpen && <AddReply commentId={comment._id} setOpenReply={setReplyOpen} />}
    </div>
  );
};

export default Comment;
