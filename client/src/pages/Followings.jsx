import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import AuthorCard from "../components/AuthorCard.jsx";
import { userContext } from "../context/UserContext.jsx";

const Followings = () =>{

    //verify whether user is logged in or not
    const {currUser} = useContext(userContext);
    const navigate = useNavigate();
    //execute this side-effect only for the first time the component is rendered
    useEffect(()=>{
        if(!currUser?.userId){
            navigate("/login");
        }
    },[]);

    const [authorData,setAuthorData] = useState();
    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        async function getAuthors(){
            try{    
                const config = {
                    headers:{
                        Authorization: `Bearer ${currUser.token}`
                    }
                }

                const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/following-authors`,config);
                let data = await response.json();
                if(data && data.length > 0){
                    setAuthorData(data);
                }
                setLoaded(true);
            }
            catch(err){
                console.log(err.response.data.message);
            }
        }
        getAuthors();
    },[]);

    if(!loaded){
        return(
            <Loader />
        )
    }

    return(
        <>
        <div className="title">
            <h1>Authors</h1>
        </div>
        {authorData && (
            <div className="authors">
            {authorData.map((author) => (
                <AuthorCard 
                    key={author._id} 
                    id={author._id}
                    name={author.username} 
                    followers={author.followerCount|| 0} 
                    posts={author.postCount||0}
                    image={author.avatar}
                    following={true}
                />
            ))}
            </div>
        )}
        {!authorData && (
            <div className="no-card">
                No Author found
            </div>
        )}
        </>
    )
};

export default Followings;