import React from "react";
import Buttons from "../components/Buttons.jsx";
import { dummyContent, dummyPosts } from "../data.js";
import {Link} from "react-router-dom";
const post = dummyPosts[0]

const PostDetails = () =>{
    return(
        <div className="post-page">
            <div className="img-div">
                <img className="img-blog" src={post.thumbnail} alt="Blog-Image"></img>
            </div>
            <div className="title-div">
                {post.title}
            </div>
            <Buttons/>
            <div className="cont-div">
                {dummyContent}
            </div>
            <div className="line"></div>
            <div className="author-div">
                <Link to={`/author/${post.authorId}`} className="author-link">
                    <img className="author-full-img" src={post.thumbnail} alt="Author-Image"></img>
                    <p className="author-name">Written By: Ayush Sur</p>
                </Link>
            </div>
        </div>
    )
};

export default PostDetails;