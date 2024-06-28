import React from "react";
import { useState, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import {userContext} from "../context/UserContext.jsx";
import axios from "axios";
import Loader from "../components/Loader.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";
import SuccessAlert from "../components/SuccessAlert.jsx";

const UserProfile = () =>{
    
    //verify whether user is logged in or not
    const {currUser} = useContext(userContext);
    const navigate = useNavigate();
    //execute this side-effect only for the first time the component is rendered
    useEffect(()=>{
        if(!currUser?.userId){
            navigate("/login");
        }
    },[]);

    
    const [profile,setProfile]= useState({
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [imgfile,setImgfile]= useState();
    const [image,setImage]= useState("");
    const [loaded,setLoaded] = useState(false);
    const [error,setError] = useState("");
    const [successmsg,setSuccessmsg] = useState("");

    //sideEffect to get data from database
    useEffect(()=>{
        async function getUser(){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/users/${currUser.userId}`);
                const data = await response.data;
                setProfile(data);
                const avatar_loc = `${import.meta.env.VITE_API_ASSETS_URL}/uploads/${data.avatar}`;
                setImage(avatar_loc);
                setLoaded(true);
            }
            catch(err){
                console.error(err);
            }
        }
        getUser();
    },[]);

    const handleChanges = (e) =>{
        setProfile({...profile,[e.target.name]:e.target.value});
    }

    const handleChangeImg = (e) =>{
        const avatar_file = e.target.files[0];
        setImgfile(avatar_file);
        if (avatar_file.type.startsWith('image/')) {
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setImage(objectUrl);
        }
        else{
            alert("Please select an image file.");
        }
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const config={
                headers:{
                    Authorization:`Bearer ${currUser.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }   //req headers

            const updatedUser = {
                username: profile.username,
                email: profile.email,
                currentPassword: profile.password,
                newPassword: profile.newPassword || "",
                confirmNewPassword: profile.confirmNewPassword || ""
            };   //req body

            const updateAvatar = {
                avatar: imgfile
            };  //req body2

            if(!profile.password && !imgfile){ 
                setError("Please change avatar  OR  enter edited credentials before submitting!");
            }
            
            if(profile.password){
                const response = await axios.patch(`${import.meta.env.VITE_API_SERVER_URL}/users/edit-user`,updatedUser, config);
                const data = await response.data;
                if(data){
                    setSuccessmsg("Profile updated successfully");
                    setProfile({profile,"password":""});
                }
            }

            if(imgfile){
                const response2 = await axios.patch(`${import.meta.env.VITE_API_SERVER_URL}/users/change-avatar`,updateAvatar,config);
                const data2 = await response2.data;
                if(data2 && !profile.password){
                    setSuccessmsg("Profile changed successfully");
                }
            }
        }
        catch(err){
            setError(err.response.data.message);
        }
    }

    if(!loaded){
        return (
            <Loader/>
        )
    }
    return(
        <div className="profile">
            <div className="centre-btn-cont">
                <Link to={`/myposts/12`}>
                    <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">MyPosts</button>
                </Link>
            </div>
            {error && <ErrorAlert error={error}/>}
            {successmsg && <SuccessAlert message={successmsg}/>}
            <form onSubmit={handleSubmit}>

            <div className="profile-img-cont">
                <img className="profile-img" src={image} alt={profile.name} accept='png, jpg, jpeg'/>
                <label htmlFor="image">
                    <div className="edit-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="edit-icon size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </div>
                </label>
                <input type="file" id="image" className="hidden" onChange={handleChangeImg}/>
            </div>

            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input
                    type="text" 
                    id="username" 
                    name="username" 
                    value={profile.username}
                    onChange={handleChanges}
                    className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Yash" 
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email ID:</label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={profile.email} 
                    onChange={handleChanges}
                    className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                <input
                    type="password" 
                    id="password" 
                    name="password" 
                    value={profile.password}
                    onChange={handleChanges}
                    className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="********" 
                />
            </div>
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                <input
                    type="password" 
                    id="newPassword" 
                    name="newPassword" 
                    value = {profile.newPassword}
                    onChange={handleChanges}
                    className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="********" 
                />
            </div>
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>
                <input
                    type="password" 
                    id="confirmNewPassword" 
                    name="confirmNewPassword" 
                    value = {profile.confirmNewPassword}
                    onChange={handleChanges}
                    className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="********" 
                />
            </div>
            <button 
                type="submit" 
                className="text-white bg-gradient-to-r mt-6 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
                    Save Changes
            </button>
            </form>
        </div>
    )
};

export default UserProfile;