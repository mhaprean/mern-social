import { IPost, useLikePostMutation } from '../redux/apiSlice';
import { ShareIcon, HandThumbUpIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

interface IPropsPost {
  post: IPost;
}

const Post = ({ post }: IPropsPost) => {
  const [likePost, response] = useLikePostMutation();

  const handleAddLike = async () => {
    try {
      const result = await likePost(post._id).unwrap();
    } catch (error) {
      console.log('error adding like. ', error);
    }
  };

  return (
    <div className="flex flex-col bg-white mb-4">
      <div className="flex flex-col shadow-sm p-2">
        <div className="flex items-center space-x-2">
          <img
            src="https://images.unsplash.com/photo-1670349148055-e11a0b3be242?ixid=MnwxMjA3fDF8MXxhbGx8MXx8fHx8fDJ8fDE2Nzk2MDM0MzA&ixlib=rb-4.0.3&dpr=1&auto=format&fit=crop&w=120&h=200&q=60"
            alt="img"
            className="rounded-full h-10 w-10"
          />
          <div>
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-xs text-gray-400">{post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}</p>
          </div>
        </div>
        <p className="text-base font-medium pt-4 pb-2">{post.content}</p>

        {!!post.image && (
          <div className="flex flex-col bg-gray-700 rounded-md">
            <img src={post.image} alt="" className="object-fill rounded-md" />
          </div>
        )}

        {post.likes.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-semibold text-gray-700">{post.likes.length === 1 ? '1 like' : `${post.likes.length} likes`}</p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center shadow-md text-gray-400 border-t">
        <button className="flex items-center flex-grow justify-center p-2 hover:bg-gray-100" onClick={handleAddLike}>
          <HandThumbUpIcon className="w-5 h-5 flex-shrink-0 mr-1" />
          <p className="text-xs sm:text-base">Like</p>
        </button>

        <button className="flex items-center flex-grow justify-center p-2 hover:bg-gray-100">
          <ChatBubbleLeftIcon className="w-5 h-5 flex-shrink-0 mr-1" />
          <p className="text-xs sm:text-base">Comment</p>
        </button>

        <button className="flex items-center flex-grow justify-center p-2 hover:bg-gray-100">
          <ShareIcon className="w-5 h-5 flex-shrink-0 mr-1" />
          <p className="text-xs sm:text-base">Share</p>
        </button>
      </div>
    </div>
  );
};

export default Post;
