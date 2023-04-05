import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSinglePostQuery } from '../redux/apiSlice';
import Post from '../components/post/Post';

const PostPage = () => {
  const { id } = useParams();

  const { data: post, isLoading } = useGetSinglePostQuery({ postId: id || '' }, { skip: !id });

  return (
    <div>
      {isLoading && (
        <>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </>
      )}

      {!isLoading && post && <Post post={post} />}
    </div>
  );
};

export default PostPage;
