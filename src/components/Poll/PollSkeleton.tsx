import React from 'react';

const PollSkeleton = () => {
  return (
    <div className="shadow-md rounded-md w-full h-72 p-8 mt-12">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-3 w-96 bg-gray-300 rounded"></div>

          <div className="flex flex-row items-center">
            <div className="rounded-full bg-gray-300 h-4 w-4"></div>
            <div className="h-2 w-24 ml-3 bg-gray-300 rounded"></div>
          </div>
          <div className="flex mt-4 flex-row items-center">
            <div className="rounded bg-gray-300 h-2 w-6"></div>
            <div className="h-2 w-full ml-3 bg-gray-300 rounded"></div>
          </div>

          <div className="flex flex-row items-center">
            <div className="rounded-full bg-gray-300 h-4 w-4"></div>
            <div className="h-2 w-24 ml-3 bg-gray-300 rounded"></div>
          </div>
          <div className="flex mt-4 flex-row items-center">
            <div className="rounded bg-gray-300 h-2 w-6"></div>
            <div className="h-2 w-full ml-3 bg-gray-300 rounded"></div>
          </div>

          <div className="py-5 flex flex-row items-center justify-between">
            <div className="h-2 w-28 bg-gray-300 rounded"></div>
            <div className="h-8 rounded-lg text-sm px-10 py-3  bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollSkeleton;
