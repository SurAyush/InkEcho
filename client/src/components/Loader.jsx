import React from 'react';
import loader_gif from "../assets/images/loader.gif";

function Loader(){
    return(
        <div className="loader-div">
            <img className="loader-gif" src={loader_gif} alt="Loading..." />
            <h2>Loading...</h2>
            <p>Please wait a moment.</p>
        </div>
    )
}

export default Loader;
