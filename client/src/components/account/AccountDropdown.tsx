import { UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { clsx } from 'clsx';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const AccountDropdown = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className="relative flex text-left ml-auto">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button className="rounded-full hover:bg-slate-300 transition-all flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1679678691005-3815eb29bc61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw4MXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              className="h-6 w-6 rounded-full"
            />
          </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={5}
            className={clsx(
              'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
              'w-48 rounded-md px-1.5 py-1 shadow-md md:w-56',
              'bg-white dark:bg-gray-800 border'
            )}
          >
            <Link to="/my-profile">
              <DropdownMenuPrimitive.Item
                className={clsx(
                  'flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none',
                  'text-gray-400 hover:bg-gray-100 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900'
                )}
              >
                <UserCircleIcon className="w-5 h-5 mr-2" />
                <span className="flex-grow text-gray-700 dark:text-gray-300">My profile</span>
              </DropdownMenuPrimitive.Item>
            </Link>

            <DropdownMenuPrimitive.Item
              className={clsx(
                'flex cursor-pointer hover:bg-gray-100 select-none items-center rounded-md px-2 py-2 text-sm outline-none',
                'text-gray-400 hover:bg-gray-100 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900'
              )}
              onClick={handleLogout}
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
              <span className="flex-grow text-gray-700 dark:text-gray-300">Logout</span>
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export default AccountDropdown;
