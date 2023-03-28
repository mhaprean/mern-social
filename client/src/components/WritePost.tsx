import { CameraIcon, VideoCameraIcon, FaceSmileIcon, XMarkIcon } from '@heroicons/react/24/solid';

import { useRef, useState } from 'react';
import { useAddPostMutation, useUploadImageMutation } from '../redux/apiSlice';

const WritePost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null | undefined>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const [addPost, response] = useAddPostMutation();

  const [uploadImage, responseUploadImage] = useUploadImageMutation();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (response.isLoading) {
      return;
    }

    try {
      const image = await handleImageUpload();

      let postBody = {
        content: text,
        image: image,
      };
      const result = await addPost(postBody).unwrap();
      if (result) {
        setText('');
        setCurrentFile(null);
        setPreviewImage(null);
      }
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

          {/* <textarea
            className="bg-gray-100 p-2 rounded-xl min-h-[60px] h-auto flex-grow"
            placeholder="Write a post"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea> */}

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
        {previewImage && (
          <div className="relative">
            <img className="w-full" src={typeof previewImage === 'string' ? previewImage : ''} alt="" />
            <button className="absolute top-2 right-2 bg-rose-600 rounded-full font-bold text-white p-1" onClick={removeImage}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </form>
      <div className="flex justify-evenly p-2 border-t">
        <div className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer">
          <VideoCameraIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-xs sm:text-sm xl:text-base">Live video</p>
        </div>

        <div
          className="flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer"
          onClick={() => {
            if (fileRef) {
              fileRef?.current?.click();
            }
          }}
        >
          <CameraIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/ video</p>
          <input type="file" ref={fileRef} onChange={handleFileChange} hidden />
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
