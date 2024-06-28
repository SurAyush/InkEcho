import React from "react";
import {Link} from "react-router-dom";
import PostAuthor from "./PostAuthor";
import LastUpdated from "./LastUpdated";


export function PostItem({id, thumbnail, category, title, description, authorId, updatedAt}){

    const des_comp = description.length>150?description.slice(0,150)+"...":description;
    const title_comp = title.length>25?title.slice(0,25)+"...":title;

    return(
        <Link to={`/posts/${id}`}>
        <div className="card">
            <div className="card-img">
                <img className="card_image" src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${thumbnail}`} alt="image"></img>
            </div>
            <div className="card-title">
                <h4>{title_comp}</h4>
            </div>
            <div className="card-cat">
                <Link to={`/posts/category/${category}`}>
                    <p>{category}</p>
                </Link>
            </div>
            <div className="card-des">
                <p>{des_comp}</p>
            </div>
            <PostAuthor authorId={authorId}/>
            <LastUpdated updatedAt={updatedAt} prefix={"Last Updated"}/>
        </div>
        </Link>
    )
}

export default PostItem;
