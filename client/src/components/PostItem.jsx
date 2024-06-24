import React from "react";
import {Link} from "react-router-dom";

export function PostItem({id, thumbnail, category, title, des, authorId}){
    const des_comp = des.length>250?des.slice(0,250)+"...":des;
    const title_comp = title.length>25?title.slice(0,25)+"...":title;
    return(
        <Link to={`/posts/${id}`}>
        <div class="card">
            <div className="card-img">
                <img className="card_image" src={thumbnail} alt="image"></img>
            </div>
            <div className="card-title">
                <h4>{title_comp}</h4>
            </div>
            <div className="card-cat">
                <Link to={`/posts/categories/${category}`}>
                    <p>{category}</p>
                </Link>
            </div>
            <div className="card-des">
                <p>{des_comp}</p>
            </div>
            <div className="card-author">
                <Link to={`/posts/authors/${authorId}`}>
                <img src={thumbnail} className="author-img"></img>
                <span>{authorId}</span>
                </Link>
            </div>
        </div>
        </Link>
    )
}

export default PostItem;

{/* <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={thumbnail} alt="" />
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{category}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{des}</p>
            <div className="content-author">
                <Link to={`/author/${authorId}`} className="flex items-center">
                    <img className="" src="" alt="Author" />
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{authorId}</p>
                </Link>
            </div>
        </div>
    </div> */}