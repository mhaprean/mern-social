import { Link, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useGetUserQuery } from '../redux/apiSlice';

import { UserPlusIcon } from '@heroicons/react/24/solid';

const UserPage = () => {
  const { id } = useParams();

  const location = useLocation();

  const pathName = location.pathname.split(id || '')[1];

  const { data: user, isLoading } = useGetUserQuery({ id: id || '' }, { skip: !id });

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-6xl m-auto">
          <div className="">
            <img
              className="object-cover h-96 w-full rounded-md flex-shrink-0"
              src="https://images.unsplash.com/photo-1681074904288-f98070d294a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </div>
          <div className="p-4 flex ">
            <div className="relative w-36 h-36 border-2 flex-shrink-0 border-white flex items-center justify-center rounded-full bg-white mt-[-40px]">
              <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className="h-full w-full flex-shrink-0" />
            </div>
            {!isLoading && user && (
              <>
                <div className="px-4">
                  <h2 className="font-bold text-md">{user.name}</h2>

                  <p>42 followers</p>
                  <p>242 following</p>
                </div>
                <div className="ml-auto">
                  <button className="bg-slate-200 text-sm flex items-center py-1 px-2 rounded-md border hover:bg-slate-300 transition-all duration-200">
                    <UserPlusIcon className="w-4 h-4 mr-2" />
                    Follow
                  </button>
                </div>
              </>
            )}

            {isLoading && <p>Loading...</p>}
          </div>

          <div className="flex gap-1 border-t text-md text-gray-800 font-semibold p-2">
            <Link to={'posts'}>
              <button
                className={`py-2 px-4 rounded-md hover:bg-slate-200 transition-all duration-200 ${
                  pathName === '/posts' ? 'bg-slate-200' : ''
                }`}
              >
                Posts
              </button>
            </Link>
            <Link to={'about'}>
              <button
                className={`py-2 px-4 rounded-md hover:bg-slate-200 transition-all duration-200 ${
                  pathName === '/about' ? 'bg-slate-200' : ''
                }`}
              >
                About
              </button>
            </Link>
            <Link to={'followers'}>
              <button
                className={`py-2 px-4 rounded-md hover:bg-slate-200 transition-all duration-200 ${
                  pathName === '/followers' ? 'bg-slate-200' : ''
                }`}
              >
                Followers
              </button>
            </Link>
            <Link to={'photos'}>
              <button
                className={`py-2 px-4 rounded-md hover:bg-slate-200 transition-all duration-200 ${
                  pathName === '/photos' ? 'bg-slate-200' : ''
                }`}
              >
                Photos
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl m-auto pb-96 px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
