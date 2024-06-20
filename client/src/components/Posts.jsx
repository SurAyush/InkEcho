import React from "react";
import { useState } from "react";
import PostItem from "./PostItem";
import { dummyPosts } from "../data.js";


function Posts() {
    const [posts, setPosts] = useState(dummyPosts);

    return(
        <div className="posts">
            {posts.map((post) => (
                <PostItem key={post.id} id={post.id} thumbnail={post.thumbnail} category={post.category} title={post.title} des={post.des} authorId={post.authorId}/>
            ))}
        </div>
    )
}

export default Posts;