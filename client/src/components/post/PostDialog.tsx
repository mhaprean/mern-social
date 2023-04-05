import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IPost, useGetSinglePostQuery } from '../../redux/apiSlice';
import Post from './Post';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface IPropsPostDialog {
  post: IPost;
  isOpen: boolean;
  onOpen: (val: boolean) => void;
}

const PostDialog = ({ post, isOpen, onOpen }: IPropsPostDialog) => {
  const { data: postData, isLoading } = useGetSinglePostQuery({ postId: post._id }, { skip: !isOpen });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onOpen(false)}>
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
              enterFrom="opacity-0 mt-80"
              enterTo="opacity-100 mt-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 mt-0"
              leaveTo="opacity-0 mt-80"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white p-0 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="text-lg font-semibold leading-6 text-gray-800 border p-2 flex items-center">
                  <p>Write a comment</p>

                  <button
                    onClick={() => onOpen(false)}
                    className="cursor-pointer hover:bg-slate-200 rounded-full p-1 flex justify-center items-center ml-auto"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </Dialog.Title>

                {isLoading && (
                  <>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Loading...</p>
                    </div>
                  </>
                )}

                <div className="mt-2 overflow-y-auto max-h-[calc(95vh-50px)]">
                  <Post post={postData || post} isDialog={true} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PostDialog;
