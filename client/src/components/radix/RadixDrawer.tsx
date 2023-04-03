import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon, Bars3BottomRightIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const RadixDrawer = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="cursor-pointer hover:bg-slate-200 rounded-full ml-2 p-1">
          <Bars3BottomRightIcon className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <Transition.Root show={open}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              forceMount
              className="DialogOverlay fixed transition-all duration-200 inset-0 bg-gray-500 bg-opacity-40 
              overflow-y-auto h-full w-full"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 right-[-260px]"
            enterTo="opacity-100 right-0"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 right-0"
            leaveTo="opacity-0 right-[-260px]"
          >
            {/* fixed top-0 right-0 h-full shadow-xl p-2 delay-400 duration-500 ease-in-out transition-all transform translate-x-0
             */}
            <Dialog.Content forceMount className="bg-white fixed top-0 h-full overflow-y-auto p-2 max-w-[260px]">
              <Dialog.Title className="flex items-center">
                <p className="text-base font-bold">MERN</p>
                <Dialog.Close asChild>
                  <button
                    className="cursor-pointer hover:bg-slate-200 rounded-full p-1 flex justify-center items-center ml-auto"
                    aria-label="Close"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </Dialog.Close>
              </Dialog.Title>
              <Dialog.Description className="DialogDescription">
                Make changes to your profile here. Click save when you're done.
              </Dialog.Description>
              <h2>content</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sit necessitatibus eveniet quae iste voluptatibus porro nisi
                voluptates, sed ea. Ut, illo. Error corporis mollitia nesciunt laboriosam fugiat, voluptates harum?
              </p>
            </Dialog.Content>
          </Transition.Child>
        </Transition.Root>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RadixDrawer;
