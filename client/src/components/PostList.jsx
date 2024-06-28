import React from "react";
import {Link} from "react-router-dom";
import LastUpdated from "./LastUpdated";

function PostList({id,thumbnail,title, createdAt, updatedAt}){
    return(
        <Link to={`/posts/${id}`}>
        <div className="mypostitem">
            <div className="mypost-item-img-cont">
                <img className="mypost-item-img" src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${thumbnail}`}/>
            </div>
            <div className="mypost-item-cont">
                <span className="mypost-item-title">{title}</span>
            </div>
            <div className="post-time-info">
                <LastUpdated updatedAt={createdAt} prefix={"Created "}/>
                <LastUpdated updatedAt={updatedAt} prefix={"Last Updated: "}/>
            </div>
            <div className="mypost-item-button-cont">
                <Link to={`/posts/${id}/edit`}>
                <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button>
                </Link>
                <Link to={`/posts/${id}/delete`}>
                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>     
                </Link>
            </div>
        </div>
        </Link>
    )
}

export default PostList;