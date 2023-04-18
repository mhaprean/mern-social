import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import AccountDropdown from './account/AccountDropdown';
import RadixDrawer from './radix/RadixDrawer';

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

  return (
    <div className="fixed top-0 left-0 w-full border shadow-sm h-[55px] flex text-sky-900 bg-white px-2 z-10">
      <div className=" m-auto flex items-center w-full">
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

        <RadixDrawer />
      </div>
    </div>
  );
};

export default Navigation;
