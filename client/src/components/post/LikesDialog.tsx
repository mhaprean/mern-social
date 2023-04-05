import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { useGetPostLikesQuery } from '../../redux/apiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Link } from 'react-router-dom';

interface IPropsLikesDialog {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  postId: string;
}

const LikesDialog = ({ isOpen, setOpen, postId }: IPropsLikesDialog) => {
  const { data: post, isLoading } = useGetPostLikesQuery({ postId }, { skip: !isOpen });

  return (
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
                <Dialog.Title as="div" className="text-lg font-semibold leading-6 text-gray-800 border p-2 flex items-center">
                  <p>Likes</p>

                  <button
                    onClick={() => setOpen(false)}
                    className="cursor-pointer hover:bg-slate-200 rounded-full p-1 flex justify-center items-center ml-auto"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </Dialog.Title>

                {isLoading && (
                  <div className="w-full flex items-center justify-center p-4">
                    <LoadingSpinner />
                  </div>
                )}

                {!isLoading && post && (
                  <div className="overflow-y-auto max-h-[calc(95vh-50px)] p-4">
                    {post.likes.map((user, idx) => (
                      <div key={idx} className="flex items-center space-x-2 my-4">
                        <Link to={'/user/' + user._id} className="hover:underline">
                          <img
                            src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                            alt="img"
                            className="rounded-full h-10 w-10"
                          />
                        </Link>

                        <div>
                          <Link to={'/user/' + user._id} className="hover:underline">
                            <p className="font-semibold">{user.name}</p>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LikesDialog;
