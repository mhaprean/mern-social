import { useState } from 'react';
import Post from '../components/post/Post';
import PostDialog from '../components/post/PostDialog';
import WritePost from '../components/WritePost';
import { IPost, useGetPostsQuery } from '../redux/apiSlice';

const Homepage = () => {
  const { data, isLoading } = useGetPostsQuery({});

  const [postDialogOpen, setPostDialogOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const openPost = (post: IPost) => {
    setSelectedPost({ ...post });
    setPostDialogOpen(true);
  };

  return (
    <div className="py-4">
      <WritePost />

      {isLoading && <div className="text-base my-4">Loading...</div>}

      {selectedPost && <PostDialog isOpen={postDialogOpen} onOpen={setPostDialogOpen} post={selectedPost} />}

      {!isLoading && data && data.posts.map((post) => <Post key={post._id} post={post} onOpenPost={() => openPost(post)} />)}
    </div>
  );
};

export default Homepage;
