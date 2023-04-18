import { CameraIcon, VideoCameraIcon, FaceSmileIcon, XMarkIcon, GlobeAmericasIcon, PhotoIcon } from '@heroicons/react/24/solid';
import React, { useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { useAddPostMutation, useUploadImageMutation } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';
import Avatar from './ui/Avatar';
import EmojiPicker from './EmojiPicker';

const WritePost = () => {
  const authState = useAppSelector((state) => state.auth);

  const [isOpen, setOpen] = useState(false);

  const [text, setText] = useState('');

  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null | undefined>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const [addPost, response] = useAddPostMutation();

  const [uploadImage, responseUploadImage] = useUploadImageMutation();

  // add emoji
  const addEmojiToText = (val: string) => {
    setText(text + val);
  };

  const handleImageUpload = async () => {
    if (!currentFile) {
      return '';
    }

    try {
      const formData = new FormData();
      formData.append('image', currentFile);

      const imageResponse = await uploadImage(formData).unwrap();

      return imageResponse.uploadedImage.secure_url;
    } catch (error) {
      console.log('image upload failed. ', error);
      return '';
    }
  };

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (response.isLoading) {
      return;
    }

    try {
      const image = await handleImageUpload();

      let postBody: { content: string; image?: string } = {
        content: text,
      };

      if (image) {
        postBody.image = image;
      }
      const result = await addPost(postBody).unwrap();
      if (result) {
        setText('');
        setCurrentFile(null);
        setPreviewImage(null);
        setOpen(false);
      }
    } catch (error) {
      console.log('!!! error ', error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 mt-80"
                enterTo="opacity-100 scale-100 mt-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100 mt-0"
                leaveTo="opacity-0 scale-95 mt-80"
              >
                <Dialog.Panel className="w-full max-w-lg max-h-[95vh] transform overflow-hidden rounded-md bg-white p-0 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className="text-lg sticky font-medium leading-6 text-gray-800 border p-2 flex items-center">
                    <p className="font-bold flex-grow text-center">Write a post</p>

                    <button
                      onClick={() => setOpen(false)}
                      className="cursor-pointer bg-slate-200 hover:bg-slate-300 transition-all duration-200  
                      rounded-full p-1 flex justify-center items-center ml-auto"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </Dialog.Title>
                  <div className="overflow-y-auto max-h-[calc(95vh-50px)] p-4">
                    <div className="flex items-center space-x-2">
                      <Avatar image={authState.user?.image || ''} />

                      <div className="flex flex-col justify-center">
                        <p className="font-semibold">{authState.user?.name}</p>

                        <div className="text-xs bg-slate-200 px-1 py-0.5 rounded-md text-gray-500 cursor-pointer flex items-center">
                          <GlobeAmericasIcon className="w-4 h-4 mr-1" />
                          <p>Public</p>
                        </div>
                      </div>
                    </div>
                    <textarea
                      onChange={(e) => setText(e.target.value)}
                      value={text}
                      className="w-full border rounded-md min-h-[60px] p-2 my-4"
                      placeholder="What's on your mind?"
                    ></textarea>

                    {previewImage && (
                      <div className="relative mb-2 rounded-md">
                        <img className="w-full rounded-md" src={typeof previewImage === 'string' ? previewImage : ''} alt="" />
                        <button className="absolute top-2 right-2 bg-rose-600 rounded-full font-bold text-white p-1" onClick={removeImage}>
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    <div className="border p-2 rounded-md mb-4 flex items-center">
                      <p className="text-sm text-gray-500 mr-auto">Add to your post:</p>
                      <EmojiPicker onPick={addEmojiToText} />
                      <button
                        className="h-8 w-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-all duration-200
                         p-1.5 flex items-center justify-center"
                        onClick={() => {
                          if (fileRef) {
                            fileRef?.current?.click();
                          }
                        }}
                      >
                        <PhotoIcon className="" />
                        <input type="file" ref={fileRef} onChange={handleFileChange} hidden />
                      </button>
                    </div>

                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="w-full font-semibold bg-sky-800 text-white p-2 rounded-md hover:bg-sky-900"
                    >
                      Create post
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="bg-white rounded shadow-md text-gray-500 font-medium mt-6 mb-6">
        {authState.user?.image}
        <div className="flex space-x-4 p-4 items-center">
          <Avatar image={authState.user?.image || ''} />
          <input
            type="text"
            placeholder="Write a post"
            className="rounded-full h-12 text-base bg-gray-100 flex-grow px-5 min-w-[20px] outline-none"
            value={''}
            readOnly
            onClick={() => setOpen(true)}
          />
        </div>

        <div className="flex justify-evenly p-2 border-t">
          <div
            onClick={() => setOpen(true)}
            className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer"
          >
            <VideoCameraIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm xl:text-base">Live video</p>
          </div>

          <div
            className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <CameraIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm xl:text-base">Photo/ video</p>
          </div>

          <div
            onClick={() => setOpen(true)}
            className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer"
          >
            <FaceSmileIcon className="h-5 w-5 text-yellow-300 flex-shrink-0" />
            <p className="text-xs sm:text-sm xl:text-base">Feeling/ Activity</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WritePost;
