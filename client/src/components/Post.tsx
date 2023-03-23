import { IPost } from '../redux/apiSlice';

interface IPropsPost {
  post: IPost;
}

const Post = ({ post }: IPropsPost) => {
  return (
    <div className="shadow-sm p-4 py-2 bg-white mb-2">
      <p className="text-base font-medium">{post.content}</p>
    </div>
  );
};

export default Post;
