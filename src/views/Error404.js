import React from "react";
import Footer from "../components/Footer";
import NavBarHome from "../components/NavBarHome";


import rickRoll from "../assets/rickRoll.gif";
import error from "../assets/404.png";



import "../styles/Error404.css"






function Error404() {

    return (
        <div id="page404-container">
            <NavBarHome nav={""} btnContent={"Homepage"}/>

            <div id="page404-container-content">
                <img id="page404-img" src={error} alt="Error 404"/>
                <img id="page404-gif" src={rickRoll} alt="Gif Rick Roll"/>
            </div>

          
            
            <Footer/>
        </div>
    );
}

export default Error404;