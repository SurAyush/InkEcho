import React from 'react'
import { useContext } from 'react';
import { userContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UnFollowButton = ({authorId}) => {

  const { currUser } = useContext(userContext);
  
  const handleSubmit = (event) =>{
    event.stopPropagation();
    async function follow(){
      try{
        
        const config={
          headers:{
              Authorization:`Bearer ${currUser.token}`
          }
        }   //req headers

        const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/users/unfollow/${authorId}`,{},config);
        const data = await response.data;
        if(data){
          console.log('User unfollowed successfully');
        }
        useNavigate('/authors');
      }
      catch(err){
        console.error(err);
      }
    }
    follow();
  }


  return (
    <Link to={'/authors'}>
    <div className="flex mt-4 md:mt-6">
      <button type="button" onClick={handleSubmit} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Unfollow</button>
    </div>
    </Link>
  )
}

export default UnFollowButton