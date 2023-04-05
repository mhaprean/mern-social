import React, { useState } from 'react';
import Avatar from '../ui/Avatar';
import { useAddCommentMutation } from '../../redux/apiSlice';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/solid';

import { Popover } from '@headlessui/react';

interface IPropsAddComment {
  postId: string;
}

const AddComment = ({ postId }: IPropsAddComment) => {
  const [text, setText] = useState('');
  const [addComment, response] = useAddCommentMutation();

  // add emoji
  const addEmoji = (e: any) => {
    setText(text + e.native);
  };

  const handleSubmit = async () => {
    if (response.isLoading || text.length < 1) {
      return;
    }

    try {
      const res = await addComment({ content: text, postId: postId }).unwrap();

      if (res) {
        setText('');
      }
    } catch (error) {
      console.log('!!! error adding comment: ', error);
    }
    console.log(text);
    setText('');
  };

  return (
    <div className="flex p-2">
      <Avatar />
      <div className="flex flex-grow flex-col p-2 pt-0 relative">
        <textarea
          id="comment"
          className="block w-full border border-gray-300 p-2 pb-6 shadow-sm bg-slate-50 rounded-xl min-h-[60px] h-max"
          placeholder="Write a comment..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>

        <div className="flex items-center mt-2">
          <button
            className="h-8 w-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-all duration-200
                         p-1.5 flex items-center justify-center ml-auto"
            onClick={() => {}}
          >
            <PhotoIcon className="w-7 h-7 text-gray-700" />
            {/* <input type="file" ref={fileRef} onChange={handleFileChange} hidden /> */}
          </button>

          <Popover className="relative">
            <Popover.Button
              className="h-8 w-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-all duration-200
             p-1.5 flex items-center justify-center ml-1"
            >
              <FaceSmileIcon className="w-7 h-7 text-orange-400" />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 border bg-white rounded-xl right-0 bottom-[40px]">
              <Picker data={data} emojiSize={20} emojiButtonSize={28} onEmojiSelect={addEmoji} maxFrequentRows={0} />
            </Popover.Panel>
          </Popover>
        </div>

        <button className="px-4 py-2 mt-2 text-sm font-semibold  text-white  bg-sky-800 rounded-md hover:bg-sky-900" onClick={handleSubmit}>
          Add comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
