import React from "react";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import AuthorCard from "../components/AuthorCard.jsx";

const Authors = () =>{

    const [authorData,setAuthorData] = useState();
    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        async function getAuthors(){
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
            {authorData.map((author) => (
                <AuthorCard 
                    key={author._id} 
                    id={author._id}
                    name={author.username} 
                    followers={0} 
                    posts={0||author.postCount}
                    image={author.avatar}
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

export default Authors;