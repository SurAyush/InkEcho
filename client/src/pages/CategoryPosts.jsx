import React from "react";
import Posts from "../components/Posts";
import { useParams } from "react-router-dom";

const CategoryPosts = () =>{
    let {category} = useParams();
    return(
        <>
        <Posts category={category}/>
        </>
    )
};

export default CategoryPosts;