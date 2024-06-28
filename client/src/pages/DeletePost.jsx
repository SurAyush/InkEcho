import React from "react";
import {useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {userContext} from "../context/UserContext.jsx"
import axios from 'axios';

const DeletePost= () =>{

    //verify whether user is logged in or not
    const {currUser} = useContext(userContext);
    const navigate = useNavigate();
    //execute this side-effect only for the first time the component is rendered
    useEffect(()=>{
        if(!currUser?.userId){
            navigate("/login");
        }
    },[]);

    const postId = useParams().id;
    useEffect(()=>{
        async function deletePost(){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/posts/${postId}`);
                const data = await response.data;
                if(data.author!=currUser?.userId){
                    navigate("/login");
                }
                else{
                    const config={
                        headers: {
                            "Authorization": `Bearer ${currUser?.token}`
                        }
                    }
                    const response = await axios.delete(`${import.meta.env.VITE_API_SERVER_URL}/posts/${postId}`,config);
                    if(response.data){
                        console.log("Post deleted successfully");
                    }
                    navigate("/myposts");
                }
            }
            catch(err){
                console.error(err);
            }
        }

        deletePost();
    },[]);



    return null;
};

export default DeletePost;