import { XMarkIcon, Bars3BottomRightIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import AccountDropdown from './account/AccountDropdown';

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const authState = useAppSelector((state) => state.auth);

  let links = [
    { name: 'HOME', link: '/' },
    { name: 'SERVICE', link: '/service' },
    { name: 'ABOUT', link: '/' },
    { name: "BLOG'S", link: '/' },
    { name: 'CONTACT', link: '/' },
  ];

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="fixed top-0 left-0 w-full border shadow-sm h-[55px] flex text-sky-900 bg-white px-2">
      <div className="max-w-xl m-auto flex items-center w-full">
        <Link to="/">
          <h2 className="font-bold">MernSocial</h2>
        </Link>

        {!authState.isAuth ? (
          <>
            <Link to="/login" className="ml-auto">
              <button className="bg-sky-800 hover:bg-sky-900 text-white text-sm font-bold py-1 px-4 rounded mx-2 ">Log in</button>
            </Link>
            <Link to="/register">
              <button className="bg-transparent hover:bg-sky-800 text-sky-900 text-sm font-bold hover:text-white py-1 px-4 border border-sky-800 hover:border-transparent rounded">
                Register
              </button>
            </Link>
          </>
        ) : (
          <AccountDropdown />
        )}

        <button className="hover:bg-slate-300 p-1 rounded-full transition-all sm:hidden ml-1" onClick={handleOpen}>
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3BottomRightIcon className="h-6 w-6" />}
        </button>

        <ul
          className={`sm:hidden md:items-center md:pb-0 p-6 absolute md:static bg-white md:z-auto top-12 shadow-md w-full md:w-auto md:pl-0 pl-9 transition-all duration-200 ease-in ${
            open ? 'left-0' : 'left-[100%]'
          }`}
        >
          {links.map((link) => (
            <li key={link.name} className=" text-xl">
              <Link to={link.link} className="text-gray-800 hover:text-gray-400 duration-200">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
