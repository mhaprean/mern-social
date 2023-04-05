import classNames from 'classnames';
import { HandThumbUpIcon as LikeSolidIcon } from '@heroicons/react/24/solid';
import { ShareIcon, HandThumbUpIcon as LikeIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { IPost, useLikePostMutation } from '../../redux/apiSlice';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

interface IPropsPostButtons {
  post: IPost;
  isDialog?: boolean;
  onCommentClick?: () => void;
}

const PostButtons = ({ post, isDialog = false, onCommentClick = () => {} }: IPropsPostButtons) => {
  const [likePost, response] = useLikePostMutation();

  const [likesOpen, setLikesOpen] = useState(false);

  const authState = useAppSelector((state) => state.auth);

  const handleAddLike = async () => {
    try {
      const result = await likePost(post._id).unwrap();
    } catch (error) {
      console.log('error adding like. ', error);
    }
  };

  return (
    <div className="flex justify-between m-2 pt-2 gap-2 items-center text-gray-400 border-t font-semibold">
      <button
        className={classNames('flex items-center flex-grow justify-center rounded-md transition-all duration-200 p-2 bg-slate-50 hover:bg-slate-100', {
          'text-blue-500': authState.isAuth && authState.user && post.likes.includes(authState.user._id),
        })}
        onClick={handleAddLike}
      >
        {authState.isAuth && authState.user && post.likes.includes(authState.user._id) ? (
          <LikeSolidIcon className="w-5 h-5 flex-shrink-0 mr-1" />
        ) : (
          <LikeIcon className="w-5 h-5 flex-shrink-0 mr-1" />
        )}

        <p className="text-xs sm:text-base">Like</p>
      </button>

      <button
        onClick={onCommentClick}
        className="flex items-center flex-grow justify-center rounded-md transition-all duration-200 p-2 bg-slate-50 hover:bg-slate-100"
      >
        <ChatBubbleLeftIcon className="w-5 h-5 flex-shrink-0 mr-1" />
        <p className="text-xs sm:text-base">Comment</p>
      </button>

      <button className="flex items-center flex-grow justify-center rounded-md transition-all duration-200 p-2 bg-slate-50 hover:bg-slate-100">
        <ShareIcon className="w-5 h-5 flex-shrink-0 mr-1" />
        <p className="text-xs sm:text-base">Share</p>
      </button>
    </div>
  );
};

export default PostButtons;
