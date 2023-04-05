import React, { useState } from 'react';
import Avatar from '../ui/Avatar';
import { useAddCommentMutation } from '../../redux/apiSlice';

interface IPropsAddComment {
  postId: string;
}

const AddComment = ({ postId }: IPropsAddComment) => {
  const [text, setText] = useState('');

  const [addComment, response] = useAddCommentMutation();

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
      <div className="flex flex-grow flex-col p-2 pt-0">
        <textarea
          id="comment"
          className="block w-full border border-gray-300 p-2 shadow-sm bg-slate-50 rounded-xl min-h-[60px] h-max"
          placeholder="Write a comment..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>
        <button className="px-4 py-2 mt-2 text-sm font-semibold  text-white  bg-sky-800 rounded-md hover:bg-sky-900" onClick={handleSubmit}>
          Add comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
