import React from "react";
import { sample_edit } from "../data.js";
import {useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {quillModules,formats} from "../quill_config.js";
import { post_categories } from "../data.js";

const EditPost = () =>{

    const [postInfo, setPostInfo] = useState(sample_edit);
    //handle change of content on submit, simple paste the event (string) of ReactQuill to postInfo.content before submitting

    const handleChange = (event) =>{
        setPostInfo({...postInfo,[event.target.name]:event.target.value});
    };

    const handleChange2 = (e) =>{
        setPostInfo(...postInfo,{[e.target.name]:e.target.file[0]});
    }

    return(
        <>
        <div className="title">Edit Post</div>
        <div className="formbox">
            <form>
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
                    value={postInfo.thumbnail}
                    onChange={handleChange2}
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    required
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
                        value={postInfo.content}
                        className="text-box-quill"
                    />
                </div>
                
                <button 
                    type="button" 
                    class="text-white bg-gradient-to-r mt-6 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
                    onSubmit="">
                        Edit Post
                </button>
            </form>
        </div>

        </>
    )
};

export default EditPost;