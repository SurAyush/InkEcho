import React from "react";
import Posts from "../components/Posts";
import { useParams } from "react-router-dom";

const AuthorPosts = () =>{
    let {author} = useParams();
    return(
        <>
        <Posts author={author}/>
        </>
    )
};

export default AuthorPosts;