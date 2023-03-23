import { XMarkIcon, Bars3BottomRightIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="border shadow-sm p-2  text-sky-900">
      <div className="max-w-screen-lg m-auto flex items-center">
        <Link to="/">
          <h2 className="font-bold">MernSocial</h2>
        </Link>

        <Link to="/login" className="ml-auto">
          <button className="bg-sky-800 hover:bg-sky-900 text-white text-sm font-bold py-1 px-4 rounded mx-2 ">Log in</button>
        </Link>
        <button className="bg-transparent hover:bg-sky-800 text-sky-900 text-sm font-bold hover:text-white py-1 px-4 border border-sky-800 hover:border-transparent rounded">
          Register
        </button>
        <button className="hover:bg-slate-300 p-1 rounded-full transition-all sm:hidden ml-1" onClick={handleOpen}>
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3BottomRightIcon className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
