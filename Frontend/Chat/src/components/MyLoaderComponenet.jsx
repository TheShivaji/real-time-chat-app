import React from 'react';

const MyLoaderComponent = () => {
  return (

    <div className="flex items-center justify-center h-screen bg-base-300">

      <div className="flex flex-col items-center gap-4 p-10 rounded-2xl bg-base-100 shadow-2xl">

        <div className="flex items-center gap-2 animate-pulse">

          <span className="text-6xl">💬</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary">
            ChatPro
          </h1>
        </div>


        <div className="w-64 mt-4">
          <progress className="progress progress-primary w-full h-2"></progress>
        </div>

        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Establishing secure connection...
        </p>
      </div>

    </div>
  );
};



export default MyLoaderComponent;
