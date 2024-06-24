import React from "react";
import { useState } from "react";
import {dummyProfile} from "../data.js";

const UserProfile = () =>{
    
    const [profile,setProfile]= useState(dummyProfile);
    const [image,setImage]= useState(dummyProfile.image);

    const handleChanges = (e) =>{
        setProfile({...profile,[e.target.name]:e.target.value});
    }
    const handleChangeImg = (e) =>{
        const imgfile = e.target.files[0];
        if (imgfile.type.startsWith('image/')) {
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setImage(objectUrl);
        }
        else{
            alert("Please select an image file.");
        }
    }

    return(
        <div className="profile">
            <form action='#'>

            <div className="profile-img-cont">
                <img className="profile-img" src={image} alt={profile.name}/>
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
                    value={profile.email} 
                    aria-label="disabled input" 
                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    disabled
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                <input
                    type="password" 
                    id="password" 
                    value={profile.password}
                    onChange={handleChanges}
                    className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="********" 
                    required
                />
            </div>
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input
                    type="password" 
                    id="confirmPassword" 
                    value = {profile.password}
                    onChange={handleChanges}
                    className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="********" 
                    required
                />
            </div>
            <button 
                type="button" 
                class="text-white bg-gradient-to-r mt-6 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
                onSubmit="">
                    Save Changes
            </button>
            </form>
        </div>
    )
};

export default UserProfile;