import React from "react";
import PostList from "../components/PostList";
import { myposts } from "../data.js";
import { useState } from "react";

const Dashboard = () =>{
    
    const [postData,setPostData] = useState(myposts);

    return(
        <>
        <div className="title">
            Dashboard
        </div>
        <div className="dashboard">
            {postData && (postData.map((post)=>{
                return(
                    <PostList key={post.id} id={post.id} thumbnail={post.thumbnail} title={post.title} />
                )
            }))}
            {!postData && <div className="no-card">No posts found</div>}
        </div>
        </>
    )
};

export default Dashboard;