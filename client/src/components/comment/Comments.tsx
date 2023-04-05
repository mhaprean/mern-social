import React, { useState } from 'react';
import { IComment } from '../../redux/apiSlice';
import Comment from './Comment';

interface IPropsComments {
  comments: IComment[];
}

const Comments = ({ comments }: IPropsComments) => {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-md font-bold text-gray-700">Comments: </h2>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
