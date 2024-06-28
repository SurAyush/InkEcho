import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";


function CategoryPosts() {
    
    const [posts, setPosts] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const {category} = useParams();

    useEffect(() =>{

        async function fetchData(){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/posts/category/${category}`);
                const data = await response.data;
                if(data!="No posts found in this category"){
                    setPosts(data);
                    setDataLoaded(true);
                }
                else{
                    setDataLoaded(true);
                }
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

export default CategoryPosts;