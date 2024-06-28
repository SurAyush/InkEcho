import React from 'react'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

const PostAuthor = ({authorId, isFull}) => {

    const [author, setAuthor] = useState({username:"", avatar:""});

    useEffect(()=>{
        async function getAuthor(){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/users/${authorId}`);
                const data = await response.data;
                setAuthor(data);
            }
            catch(err){
                console.log(err);
            }
        }
        getAuthor();
    })

    if(isFull) {
        return (
            <div className="author-div">
                <Link to={`/posts/authors/${author._id}`} className="author-link">
                    <img className="author-full-img" src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${author.avatar}`} alt="Author-Image"></img>
                    <p className="author-name">Written By: {author.username}</p>
                </Link>
            </div>
        )
    }

  return (
    <div className="card-author">
        <Link to={`/posts/authors/${author._id}`}>
            <img src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${author.avatar}`} className="author-img" alt={author.username} ></img>
            <span>{author.username}</span>
        </Link>
    </div>
  )
}

export default PostAuthor