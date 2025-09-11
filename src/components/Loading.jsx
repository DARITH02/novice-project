import React from 'react';

const Loading = () => {
    return (
        <>
            <div className="w-full fixed top-0 left-0 h-screen bg-gray-50/60  flex justify-center items-center">
                <div className="w-20 h-20 rounded-full animate-spin border-4 border-purple-500 border-b-transparent">
                </div>
                <span className="text-gray-600 text-5xl font-bold ml-3 animate-pulse duration-200">Loading <span className="animate-pulse duration-75">.</span><span className="animate-pulse duration-150 ">....</span></span>
            </div>
        </>
    );
};

export default Loading;