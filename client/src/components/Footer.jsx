import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import CategoryBar from "./CategoryBar.jsx"



const Footer = () =>{
    return(
        <>
    <CategoryBar/>
    <footer id="footer" className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">InkEcho™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href={import.meta.env.VITE_API_MY_LINKEDIN} className="icons"><FaLinkedin/></a>
        </li>
        <li>
            <a href={import.meta.env.VITE_API_MY_GITHUB} className="icons"><FaGithub /></a>
        </li>
    </ul>
    </div>
    </footer>
    </>
    )
};

export default Footer;