import React from "react";
import PostList from "../components/PostList";
import { useState,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {userContext} from "../context/UserContext.jsx"
import axios from 'axios'
import Loader from '../components/Loader.jsx'


const Dashboard = () =>{
    
    //verify whether user is logged in or not
    const {currUser} = useContext(userContext);
    const navigate = useNavigate();
    //execute this side-effect only for the first time the component is rendered
    useEffect(()=>{
        if(!currUser?.userId){
            navigate("/login");
        }
    },[]);

    const [postData,setPostData] = useState();
    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/posts/user/${currUser.userId}`);
                const data = await response.data;
                if (data != "No posts found by this author"){
                    setPostData(data);
                }
                setLoaded(true);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);

    if(!loaded){
        return(
            <Loader />
        )
    }

    return(
        <>
        <div className="title">
            Dashboard
        </div>
        <div className="dashboard">
            {postData && (postData.map((post)=>{
                return(
                    <PostList key={post._id} id={post._id} thumbnail={post.thumbnail} title={post.title} createdAt={post.createdAt} updatedAt={post.updatedAt} />
                )
            }))}
            {!postData && <div className="no-card">No posts found</div>}
        </div>
        </>
    )
};

export default Dashboard;