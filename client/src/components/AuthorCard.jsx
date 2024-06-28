import React from "react";
import { Link } from "react-router-dom";

function AuthorCard({id,name,followers,posts,image}){

    return(
    <Link to={`/posts/authors/${id}`}>    
    <div className="author-card">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-4">
            <img className="w-24 h-24 mb-3 mt-3 rounded-full shadow-lg" src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${image}`} alt="{name}"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Followers: {followers}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Posts: {posts}</span>
            <div className="flex mt-4 md:mt-6">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Follow
                </span>
            </button>
            </div>
        </div>
        </div>
    </div>
    </Link>
);

}

export default AuthorCard;