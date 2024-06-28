import React from "react";
import {useContext} from 'react'
import {Link} from "react-router-dom";
import { userContext } from "../context/UserContext";
import NavList from "./NavList";
import NavListLoggedIn from "./NavListLoggedIn";

function PrimaryNav() {
  const { currUser } = useContext(userContext);

  return (
    <> 
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to={`/`}>
    <p className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://cdn-icons-png.flaticon.com/512/4597/4597267.png" className="h-8" alt="InkEcho Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">InkEcho</span>
    </p>
    </Link>
    <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    {currUser?.userId && <NavListLoggedIn id={currUser.userId} username={currUser.username}/>}
    {!currUser?.userId && <NavList/>}
    </div>
    </nav>
    </>
  );
}

export default PrimaryNav;