import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import {userContext} from "../context/UserContext"


function FollowingPosts() {
    
    //verify whether user is logged in or not
    const {currUser} = useContext(userContext);
    const navigate = useNavigate();
    //execute this side-effect only for the first time the component is rendered
    useEffect(()=>{
        if(!currUser?.userId){
            navigate("/login");
        }
    },[]);

    const [posts, setPosts] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() =>{

        async function fetchData(){
            try{

                const config = {
                    headers:{
                        Authorization: `Bearer ${currUser.token}`
                    }
                }

                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/posts/following-posts`,config);
                const data = await response.data;
                if(data && data.length>0){
                    setPosts(data);
                    setDataLoaded(true);
                }
                else{
                    setDataLoaded(true);
                }
            }
            catch(err){
                console.log(err.response.data.message);
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

export default FollowingPosts;