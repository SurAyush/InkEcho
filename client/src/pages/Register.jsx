import React from "react";
import { useState } from "react";
import {Link} from "react-router-dom";

const Register = () =>{

    let [userInfo,setUserInfo] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        username:"",
    });

    const handleChange = (event) =>{
        setUserInfo({...userInfo,[event.target.name]:event.target.value});
    };

    return(
        <>
        <div className="title">
            Register
        </div>
        <div className="form-box">
        <form action="#">
            <div className="mb-6">
            <label htmlFor="email" classNameName="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input 
                type="email" 
                id="email"
                name="email" 
                value={userInfo.email} 
                onChange = {handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="yash123@gmail.com" 
                required />
            </div> 
            <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input
                type="text" 
                id="username" 
                name="username"
                value={userInfo.username} 
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Yash" 
                required />
            </div>
            <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input 
                type="password" 
                id="password" 
                name="password"
                value={userInfo.password} 
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="•••••••••" 
                required />
            </div> 
            <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={userInfo.confirmPassword} 
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="•••••••••" 
                required />
            </div>
            <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button>
        </form>
        <Link to={`/login`}>
        <span className="highlight-span" >Already have an account? Login instead!</span>
        </Link>
        </div>
        </>
    )
};

export default Register;