import React from 'react';
import { Link } from 'react-router-dom';

interface IPropsPhotosSection {
  userId: string;
}

const PhotosSection = ({ userId }: IPropsPhotosSection) => {
  return (
    <div className="bg-white flex-grow rounded-md text-gray-700 font-semibold flex-shrink-0 mt-2">
      <div className="flex justify-between items-center p-2 pl-4">
        <h2 className="text-md font-bold ">Photos</h2>
        <Link
          to={`/user/${userId}/photos`}
          className="text-blue-500 font-semibold rounded-md transition-all duration-200 hover:bg-slate-200 px-2 py-1"
        >
          See all photos
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2 p-2">
        <div className="w-full h-0 shadow-lg pb-[100%] rounded-md bg-gray-300 relative overflow-hidden">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1681518628446-8cbd07d134f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Image 1"
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden 
          bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[rgba(255,255,255,0.2)]"
          ></div>
        </div>

        <div className="w-full h-0 shadow-lg pb-[100%] rounded-md bg-gray-300 relative overflow-hidden">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1681445019831-1c22cd19c9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="Image 1"
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden 
          bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[rgba(255,255,255,0.2)]"
          ></div>
        </div>

        <div className="w-full h-0 shadow-lg pb-[100%] rounded-md bg-gray-300 relative overflow-hidden">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1681649022240-851ee1fac747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="Image 1"
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden 
          bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[rgba(255,255,255,0.2)]"
          ></div>
        </div>

        <div className="w-full h-0 shadow-lg pb-[100%] rounded-md bg-gray-300 relative overflow-hidden">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1681518628446-8cbd07d134f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Image 1"
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden 
          bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[rgba(255,255,255,0.2)]"
          ></div>
        </div>

        <div className="w-full h-0 shadow-lg pb-[100%] rounded-md bg-gray-300 relative overflow-hidden">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1681518628446-8cbd07d134f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Image 1"
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden 
          bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[rgba(255,255,255,0.2)]"
          ></div>
        </div>

        <div className="w-full h-0 shadow-lg pb-[100%] rounded-md bg-gray-300 relative overflow-hidden">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1681767882515-631ce72a18a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="Image 1"
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden 
          bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[rgba(255,255,255,0.2)]"
          ></div>
        </div>

        <div className="w-full h-0 shadow-lg pb-[100%] rounded-md bg-gray-300 relative overflow-hidden">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1681057574728-64e202c03a05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Image 1"
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden 
          bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[rgba(255,255,255,0.2)]"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PhotosSection;
