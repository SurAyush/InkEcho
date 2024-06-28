import React from "react";
import { sample_edit } from "../data.js";
import {useState, useEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {quillModules,formats} from "../quill_config.js";
import { post_categories } from "../data.js";
import {userContext} from "../context/UserContext.jsx"
import Loader from "../components/Loader.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";
import axios from "axios";

const EditPost = () =>{

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
    const [postInfo, setPostInfo] = useState();
    const [postImage,setPostImage] = useState();
    const [loaded,setLoaded] = useState(false);
    const [err,setErr] = useState();

    useEffect(()=>{
        async function getData(){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/posts/${postId}`);
                const data = await response.data;
                const author = data.author;
                if(author != currUser?.userId) {
                    navigate("/login");
                }
                setPostInfo(data);
                setLoaded(true);
                
            }
            catch(err){
                console.error(err);
            }
        }

        getData();
    },[]);


    const handleChange = (event) =>{
        setPostInfo({...postInfo,[event.target.name]:event.target.value});
    };

    const handleImgChange = (event) =>{
        const post_image = event.target.files[0];
        setPostImage(post_image);
        if(!post_image.type.startsWith('image/')){
            alert('Please select an image file');
        }
    };

    const handleTextChange = (event) =>{
        setPostInfo({...postInfo,description:event});
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        async function postData(){

            const formData = {
                title: postInfo.title,
                description: postInfo.description,
                category: postInfo.category,
                thumbnail: postImage,
            }; //req-body

            const config = {
                headers:{
                    Authorization:`Bearer ${currUser.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

            try{
                const response = await axios.patch(`${import.meta.env.VITE_API_SERVER_URL}/posts/${postId}`,formData,config);
                const data = await response.data;
                if(data){
                    navigate(`/posts/${postId}`);
                }
            }
            catch(err){
                console.error(err);
                if(err.response.data.message){
                    setErr(err.response.data.message);
                }
            }
        }
        postData();

    }

    if(!loaded){
        return(
            <Loader />
        )
    }

    return(
        <>
        <div className="title">Edit Post</div>
        <div className="formbox">
            {err && <ErrorAlert error={err}/>}
            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <label htmlFor="postTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="postTitle"
                        onChange = {handleChange}
                        value={postInfo.title} 
                        placeholder="Artificial Intelligence" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="thumbnail">Blog Thumbnail</label>
                    <br></br><br></br>
                    <input
                    id="thumbnail"
                    name="thumbnail"
                    onChange={handleImgChange}
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="category">Category</label>
                    <select 
                    id="category" 
                    name="category"
                    value={postInfo.category} 
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                        <option selected>Choose a category</option>
                        {
                            post_categories.map((cat)=>{
                                return <option key={cat} value={cat}>{cat}</option>
                            })
                        }
                    </select>
                </div>
                <div className="mb-8">
                    <label htmlFor="postContent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Content</label>
                    <ReactQuill
                        modules={quillModules}
                        formats={formats}
                        id="postcontent"
                        name="content"
                        value={postInfo.description}
                        onChange={handleTextChange}
                        className="text-box-quill"
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="text-white bg-gradient-to-r mt-6 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
                    >
                        Edit Post
                </button>
            </form>
        </div>

        </>
    )
};

export default EditPost;