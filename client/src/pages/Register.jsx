import React from "react";
import ErrorAlert from "../components/ErrorAlert";
import { useState, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {userContext} from '../context/UserContext.jsx'


const Register = () =>{
    
    let [userInfo,setUserInfo] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        username:"",
    });

    let [error,setError] = useState("");

    const {setCurrUser} = useContext(userContext);
    const navigate = useNavigate();

    const handleChange = (event) =>{
        setUserInfo({...userInfo,[event.target.name]:event.target.value});
    };

    //auto-login when the user registers through front-end
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/users/register`,userInfo);
            const newUser = await response.data;
            console.log(newUser);
            if(!newUser){
                return setError("Failed To Register");
            }

            //login
            const userInfoLogin = {username:userInfo.username, password:userInfo.password};
            const responseLogin = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/users/login`,userInfoLogin);
            const userdata = await responseLogin.data;
            setCurrUser(userdata);
            navigate("/");
        }
        catch(err){
            setError(err.response.data.message);
        }

    }

    return(
        <>
        <div className="title">
            Register
        </div>
        <div className="form-box">
        {error && <ErrorAlert error={error}/>}
        <form onSubmit={handleSubmit} >
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