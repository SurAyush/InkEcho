import React from "react";
import {authors} from "../data.js";
import { useState } from "react";
import AuthorCard from "../components/AuthorCard.jsx";

const Authors = () =>{

    const [authorData,setAuthorData] = useState(authors);

    return(
        <>
        <div className="title">
            <h1>Authors</h1>
        </div>
        {authorData && (
            <div className="authors">
            {authorData.map((author) => (
                <AuthorCard 
                    key={author.author_id} 
                    id={author.author_id}
                    name={author.name} 
                    followers={author.followers} 
                    posts={author.posts}
                    image={author.image}
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