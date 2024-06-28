import React, {useState, useEffect, createContext} from 'react';

export const userContext = createContext();

const userProvider = ({children})=>{

    // state variable (accessible everywhere using React-Context API) of logged in user
    // initially sets currUser to null or to userInfo if it is previously stored in localStorage (of browser)
    const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem('user')));

    // useEffect hook to save user state to local storage when user changes (and initially once(it sets localStorage.user to null))
    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(currUser));
    }, [currUser]);

    return(
        <userContext.Provider value={{currUser,setCurrUser}}>{children}</userContext.Provider>
    )

}

export default userProvider;