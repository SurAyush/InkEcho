import React from "react";
import { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader";
import AuthorCard from "../components/AuthorCard.jsx";
import { userContext } from "../context/UserContext.jsx";

const Authors = () =>{

    const [authorData,setAuthorData] = useState();
    const [loaded,setLoaded] = useState(false);
    const {currUser} = useContext(userContext);
    const userId = currUser?.userId;
    const [user,setUser] = useState();

    useEffect(()=>{
        async function getAuthors(){
            //Fetch user
            if(userId){
                const response_user = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/${userId}`);
                const data_user = await response_user.json();
                setUser(data_user);
            }

            //Fetch authors from the server
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/users/authors`);
            const data = await response.json();
            setAuthorData(data);
            setLoaded(true);
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
            {authorData.map((author) => {
                let isFollower = 0;
                if(user){
                    isFollower = -1;
                    if(user.following.length>0 && user.following.includes(author._id)){
                        isFollower = 1;
                    }
                }
                return (<AuthorCard 
                    key={author._id} 
                    id={author._id}
                    name={author.username} 
                    followers={author.followerCount || 0} 
                    posts={author.postCount || 0}
                    image={author.avatar}
                    following={isFollower}
                />
            )})}
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

export default Authors;