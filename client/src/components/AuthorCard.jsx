import React from "react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import UnFollowButton from "./UnFollowButton";

function AuthorCard({id,name,followers,posts,image,following}){

    return(
    <Link to={`/posts/authors/${id}`}>    
    <div className="author-card">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-4">
            <img className="w-24 h-24 mb-3 mt-3 rounded-full shadow-lg" src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${image}`} alt="{name}"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Followers: {followers}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Posts: {posts}</span>    
            {following==-1 && <FollowButton authorId={id} />}
            {following==1 && <UnFollowButton authorId={id} />}
        </div>
        </div>
    </div>
    </Link>
);

}

export default AuthorCard;