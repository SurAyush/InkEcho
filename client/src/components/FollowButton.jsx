import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { userContext } from '../context/UserContext.jsx'

const FollowButton = ({authorId}) => {

  const { currUser } = useContext(userContext);
  
  const handleSubmit = (e) =>{
    async function follow(){
      try{
        
        const config={
          headers:{
              Authorization:`Bearer ${currUser.token}`
          }
        }   //req headers

        console.log(config);
        const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/users/follow/${authorId}`,{},config);
        const data = await response.json();
        if(data){
          console.log('User followed successfully');
          useNavigate('/authors');
        }
      }
      catch(err){
        console.error(err.response.data.message);
      }
    }
    follow();
  }

  return (
    <Link to={'/authors'} onClick={() => {window.location.href = "/authors";}}>
    <div className="flex mt-4 md:mt-6">
      <button type="button" onClick={handleSubmit} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Follow</button>
    </div>
    </Link>
  )
}

export default FollowButton