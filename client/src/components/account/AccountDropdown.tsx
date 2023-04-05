import { UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { clsx } from 'clsx';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar';

const AccountDropdown = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authState = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <div className="relative flex text-left ml-auto">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button className="rounded-full hover:bg-slate-300 transition-all flex-shrink-0">
            <Avatar image={authState.user?.image} size="small" />
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
