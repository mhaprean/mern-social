import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../ui/Avatar';
import { IComment, useAddCommentMutation, useAddReplyMutation, useUploadImageMutation } from '../../redux/apiSlice';

import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';

import { useUploadImage } from '../../hooks/useUploadImage';
import EmojiPicker from '../EmojiPicker';
import { useAppSelector } from '../../redux/hooks';
import { IUser } from '../../redux/authSlice';

interface IPropsAddComment {
  postId: string;
  commentId?: string;
  isReply?: boolean;
  setOpenReply?: (val: boolean) => void;
}

const AddComment = ({ postId, commentId = '', isReply = false, setOpenReply = () => {} }: IPropsAddComment) => {
  const [text, setText] = useState('');
  const [addComment, response] = useAddCommentMutation();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const authState = useAppSelector((state) => state.auth);

  const [addReply, addReplyResponse] = useAddReplyMutation();

  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null | undefined>(null);

  const { handleImageUpload } = useUploadImage(currentFile);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef?.current && isReply) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
      setCurrentFile(e.target.files[0]);
    }

    reader.onload = (event) => {
      setPreviewImage(event.target?.result);
    };
  };

  const removeImage = () => {
    setPreviewImage(null);
    setCurrentFile(null);
  };

  // add emoji
  const addEmojiToText = (val: string) => {
    setText(text + val);
  };

  const handleSubmit = async () => {
    if (response.isLoading || addReplyResponse.isLoading || text.length < 1) {
      return;
    }

    if (!authState.isAuth || !authState.user) {
      return;
    }

    const user = { _id: authState.user._id, name: authState.user.name, email: authState.user.email };

    try {
      if (isReply) {
        let newReply: { content: string; commentId: string; image?: string; user: Partial<IUser>; postId: string } = {
          content: text,
          commentId: commentId,
          user,
          postId,
        };

        if (currentFile) {
          const image = await handleImageUpload();
          newReply = { ...newReply, image };
        }

        const res = await addReply({ ...newReply, content: text }).unwrap();

        if (res) {
          setText('');
          setPreviewImage(null);
          setCurrentFile(null);
          setOpenReply(false);
        }
      } else {
        let newComment: Partial<IComment> & { postId: string } = { content: text, postId: postId };

        if (currentFile) {
          const image = await handleImageUpload();
          newComment = { ...newComment, image };
        }
        const res = await addComment({ ...newComment, content: text, postId: postId, user }).unwrap();

        if (res) {
          setText('');
          setPreviewImage(null);
          setCurrentFile(null);
        }
      }
    } catch (error) {
      console.log('!!! error adding comment: ', error);
    }
    setText('');
  };

  return (
    <div className="flex my-2">
      <Avatar />
      <div className="flex flex-grow flex-col p-2 pt-0 relative">
        <textarea
          ref={textareaRef}
          className="block w-full border border-gray-300 p-2 pb-6 shadow-sm bg-slate-50 rounded-xl min-h-[30px] h-max"
          placeholder={isReply ? 'Write a reply...' : 'Write a comment...'}
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>

        {previewImage && (
          <div className="relative my-2 rounded-md">
            <img className="w-full rounded-md" src={typeof previewImage === 'string' ? previewImage : ''} alt="" />
            <button className="absolute top-2 right-2 bg-rose-600 rounded-full font-bold text-white p-1" onClick={removeImage}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-center mt-2">
          <button
            className="h-8 w-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-all duration-200
                         p-1.5 flex items-center justify-center ml-auto"
            onClick={() => {
              if (fileRef) {
                fileRef?.current?.click();
              }
            }}
          >
            <PhotoIcon className="w-7 h-7 text-gray-700" />
            <input type="file" ref={fileRef} onChange={handleFileChange} hidden />
          </button>

          <EmojiPicker onPick={addEmojiToText} />
        </div>

        <button className="px-4 py-2 mt-2 text-sm font-semibold  text-white  bg-sky-800 rounded-md hover:bg-sky-900" onClick={handleSubmit}>
          {isReply ? 'Add reply' : 'Add comment'}
        </button>
      </div>
    </div>
  );
};

export default AddComment;
