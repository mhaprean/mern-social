import { IPost, useGetPostCommentsQuery } from '../../redux/apiSlice';
import { HandThumbUpIcon as LikeSolidIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import LikesDialog from './LikesDialog';
import PostButtons from './PostButtons';
import Avatar from '../ui/Avatar';
import AddComment from '../comment/AddComment';
import Comments from '../comment/Comments';

interface IPropsPost {
  post: IPost;
  isDialog?: boolean;
  onOpenPost?: () => void;
}

const Post = ({ post, isDialog = false, onOpenPost = () => {} }: IPropsPost) => {
  const [likesOpen, setLikesOpen] = useState(false);

  const { data: comments, isLoading } = useGetPostCommentsQuery({ postId: post._id }, { skip: !isDialog });

  return (
    <div className="flex flex-col bg-white rounded-md mb-4">
      <div className="flex flex-col p-2">
        <div className="flex items-center space-x-2">
          <Avatar image={post.user?.image} />
          <div>
            <Link to={'/user/' + post.user._id}>
              <p className="font-semibold">{post.user.name}</p>
            </Link>

            <Link to={`/posts/${post._id}`}>
              <p className="text-xs text-gray-400 cursor-pointer hover:underline">
                {post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}
              </p>
            </Link>
          </div>
        </div>
        <div className="text-base font-medium pt-4 pb-2 text-gray-800">
          {post.content.split('\n').map((line, idx) => (
            <p className="mb-2" key={idx}>
              {line}
            </p>
          ))}
        </div>

        {!!post.image && (
          <div className="flex flex-col bg-gray-700 rounded-md">
            <img src={post.image} alt="" className="object-fill rounded-md" />
          </div>
        )}

        <div className="flex items-center mt-2 font-semibold text-gray-700">
          {post.likes.length > 0 && (
            <>
              <button className="flex items-center cursor-pointer" onClick={() => setLikesOpen(true)}>
                <p className="p-1 rounded-full bg-blue-500 mr-1">
                  <LikeSolidIcon className="w-3 h-3 text-white" />
                </p>
                <p className="text-sm font-semibold  mr-2">{post.likes.length}</p>
              </button>

              <LikesDialog isOpen={likesOpen} setOpen={setLikesOpen} postId={post._id} />
            </>
          )}

          {post.comments && post.comments.length > 0 && (
            <button
              className="text-sm ml-auto hover:underline"
              onClick={() => {
                if (!isDialog) {
                  onOpenPost();
                }
              }}
            >
              {post.comments.length === 1 ? '1 Comment' : post.comments.length + ' Comments'}
            </button>
          )}
        </div>
      </div>

      <PostButtons post={post} isDialog={isDialog} onCommentClick={onOpenPost} />

      {isDialog && !isLoading && comments && <Comments comments={comments} />}
      {isDialog && <AddComment postId={post._id} />}
    </div>
  );
};

export default Post;
