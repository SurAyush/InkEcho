import React from "react";
import { useState, useEffect } from "react";
import PostItem from "./PostItem";
import Loader from "./Loader.jsx";
import axios from 'axios';


function Posts() {
    
    const [posts, setPosts] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() =>{

        async function fetchData(){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/posts`);
                const data = await response.data;
                setPosts(data);
                setDataLoaded(true);
            }
            catch(err){
                console.log(err);
            }
        }
        
        fetchData();

    },[]);

    if(!dataLoaded){
        return(
            <Loader/>
        );
    }

    return(
        <>
        {posts && (
            <div className="posts">
                {posts.map((post) => (
                    <PostItem 
                        key={post._id} 
                        id={post._id} 
                        thumbnail={post.thumbnail} 
                        category={post.category} 
                        title={post.title} 
                        description={post.description}
                        updatedAt={post.updatedAt} 
                        authorId={post.author}/>
                ))}
            </div>
        )}
        {!posts && (
            <div className="no-card">
                No Blogs found
            </div>
        )}
        </>
    )
}

export default Posts;