import Post from '../components/Post';
import WritePost from '../components/WritePost';
import { useGetPostsQuery } from '../redux/apiSlice';

const Homepage = () => {
  const { data, isLoading } = useGetPostsQuery({});
  return (
    <div className="py-4">
      <WritePost />
      {!isLoading && data && data.posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Homepage;
