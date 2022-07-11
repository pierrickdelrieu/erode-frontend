import React from "react";


import "../styles/Loading.css"


import loadingImg from "../assets/loading.svg"
import { removeToken } from "./utils/useToken";



function Loading() {

    return (
        <div id="loading-container">
            <div id="loading-content">
                <h1>Loading in progress ...</h1>
                <img src={loadingImg} alt="Loading"/>
            </div>
        </div>
    );
}

export default Loading;




export function openLoading(setLoading, codeError) {
    setLoading(true)
    document.body.style = "overflow-y: hidden"
    return setTimeout(closeLoading, 10000, setLoading, null, codeError);

}

export function closeLoading(setLoading, interval, codeError=0) {  
    setLoading(false)
    document.body.style = "overflow-y: unset"

    clearTimeout(interval); 
    console.log("end : " + interval)
    

    if(codeError === 1) {
        alert("Request expired")
        removeToken()
        window.location.replace('/')
    } else if(codeError === 2){
        alert("Request expired")
    }
}

