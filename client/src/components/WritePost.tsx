import { CameraIcon, VideoCameraIcon, FaceSmileIcon } from '@heroicons/react/24/solid';

import { useState } from 'react';
import { useAddPostMutation } from '../redux/apiSlice';

const WritePost = () => {
  const [text, setText] = useState('');

  const [addPost, response] = useAddPostMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (response.isLoading) {
      return;
    }

    try {
      const result = await addPost({ content: text }).unwrap();
    } catch (error) {
      console.log('!!! error ', error);
    }
  };
  return (
    <div className="bg-white rounded shadow-md text-gray-500 font-medium mt-6 mb-6">
      <form className="flex-grow" onSubmit={handleSubmit}>
        <div className="flex space-x-4 p-4 items-center">
          <img
            src="https://images.unsplash.com/photo-1670349148055-e11a0b3be242?ixid=MnwxMjA3fDF8MXxhbGx8MXx8fHx8fDJ8fDE2Nzk2MDM0MzA&ixlib=rb-4.0.3&dpr=1&auto=format&fit=crop&w=120&h=200&q=60"
            alt=""
            className="rounded-full w-10 h-10 flex-shrink-0"
          />

          <input
            type="text"
            placeholder="Write a post"
            className="rounded-full h-12 text-base bg-gray-100 flex-grow px-5 min-w-[20px] focus:outline-sky-100"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="hidden">
            write post
          </button>
        </div>
      </form>
      <div className="flex justify-evenly p-3 border-t">
        <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <VideoCameraIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-xs sm:text-sm xl:text-base">Live video</p>
        </div>
        <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <CameraIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/ video</p>
        </div>
        <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <FaceSmileIcon className="h-5 w-5 text-yellow-300 flex-shrink-0" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/ Activity</p>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
