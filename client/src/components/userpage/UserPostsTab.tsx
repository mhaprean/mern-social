import { IPost, useGetUserPostsQuery } from '../../redux/apiSlice';
import { useParams } from 'react-router-dom';
import Post from '../post/Post';
import { useState } from 'react';
import AboutSection from './AboutSection';
import PhotosSection from './PhotosSection';

const UserPostsTab = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserPostsQuery({ userId: id || '' });

  const [postDialogOpen, setPostDialogOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const openPost = (post: IPost) => {
    setSelectedPost({ ...post });
    setPostDialogOpen(true);
  };

  return (
    <div className="flex gap-2 mt-2">
      <div className="max-w-md flex-grow flex-shrink-0">
        <AboutSection />

        <PhotosSection userId={id || ''} />
      </div>

      <div className="bg-white max-w-2xl flex-grow">
        {!isLoading && data && data.posts.map((post) => <Post key={post._id} post={post} onOpenPost={() => openPost(post)} />)}
      </div>
    </div>
  );
};

export default UserPostsTab;
