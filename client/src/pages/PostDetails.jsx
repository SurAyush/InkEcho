import React from "react";
import {useState, useEffect, useContext} from "react";
import { Link,useParams } from "react-router-dom";
import axios from 'axios';
import DOMPurify from 'dompurify'
import Loader from "../components/Loader.jsx";
import PostAuthor from "../components/PostAuthor.jsx";
import LastUpdated from "../components/LastUpdated.jsx";
import {userContext} from "../context/UserContext.jsx";

const PostDetails = () =>{

    const {currUser} = useContext(userContext);

    const [post,setPost] = useState({
        thumbnail: "",
        title: "",
        description: "",
        createdAt: "",
        updatedAt:"",
        author: "",
    });
    const [loaded,setLoaded] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    
    const {id} = useParams();

    useEffect(()=>{
        
        async function getPost(){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/posts/${id}`);
                const data = await response.data;
                setPost(data);
                setLoaded(true);
                const {author} = data;
                if(currUser?.userId == author){
                    setIsAuthor(true);
                }
            }
            catch(err){
                console.log(err);
            }
        }

        getPost();

    },[]);

    if(!loaded){
        return <Loader/>
    }

    return(
        <div className="post-page">
            <div className="img-div">
                <img className="img-blog" src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${post.thumbnail}`} alt="Blog-Image"></img>
            </div>
            <div className="title-div">
                {post.title}
            </div>
            
            {isAuthor && <div className="button-line">
                <Link to={`edit`}>
                <button type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button>
                </Link>
                <Link to={`delete`}>
                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                </Link>
            </div>}

            <div
                className="cont-div"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}
            />
            <div className="line"></div>
            <LastUpdated updatedAt={post.updatedAt} prefix={"Created"}/>
            <LastUpdated updatedAt={post.updatedAt} prefix={"Last Updated"}/>
            <PostAuthor isFull={true} authorId={post.author}/>
        </div>
    )
};

export default PostDetails;