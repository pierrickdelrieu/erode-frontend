import React, { useState } from 'react';
import InputField from "../components/InputField";
import ButtonForm from "../components/ButtonForm";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';


import {api} from '../configApi'

import "../styles/Login.css"
import NavBarHome from "../components/NavBarHome";
import Popup from '../components/Popup';

import Loading, {openLoading, closeLoading} from "../components/Loading";



async function checkUserCredentials(credentials) {
    return fetch(api.url + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}


async function loginUser(credentials) {
    return fetch(api.url + '/2fa/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}


function getUsernameTagcode(credit) {
    if(credit.includes('@')) {
        const data = credit.split("@")
        return {
            username: data[0], 
            tagcode: data[1]
        }
    } 

    return {
        username: credit, 
        tagcode: ""
    }
}



function Login({setToken}) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [code, setCode] = useState();

    const [displayPopup, setDisplayPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    

    const handleSubmitForm = async e => {
        e.preventDefault();
        const credit = getUsernameTagcode(username)

        const usernamef = credit.username
        const tagcodef = credit.tagcode

        let myInterval = openLoading(setIsLoading, 2)
        const response = await checkUserCredentials({
          username: usernamef,
          tagcode: tagcodef,
          password: password,
        });
        closeLoading(setIsLoading, myInterval)


        if(response.message !== "Invalid information") {
            if(!response.is2FAEnabled) {
                setToken(response.token);
                window.location.reload()
            } else {
                setDisplayPopup(true)
            }
        } else {
            alert("Wrong credits")
        }
        
    }


    const handleSubmitPopup = async e => {
        e.preventDefault();
        const credit = getUsernameTagcode(username)

        const usernamef = credit.username
        const tagcodef = credit.tagcode

        let myInterval = openLoading(setIsLoading, 2)
        const response = await loginUser({
          username: usernamef,
          tagcode: tagcodef,
          password: password,
          usertwoFACode: code
        });
        closeLoading(setIsLoading, myInterval)

        if(response.message === "Invalid code information") {
            alert("Wrong secret code")
        } else {
            setToken(response.token)
            window.location.reload()
        }        
    }


    function handleCodeChange(event) {
        const codeContainer = document.getElementById("inputField-input-codesecret")

        if(codeContainer.value.length !== 6) {
            codeContainer.setCustomValidity("Code size must be 6 digits");
        } else {
            codeContainer.setCustomValidity("");
        }

        setCode(codeContainer.value)
    }


    function handleUsernameChange(event) {
        const usernameContainer = document.getElementById("inputField-input-username")

        if(usernameContainer.value.length > 20) {
            usernameContainer.setCustomValidity("The size of the username must be less than 20 characters");
        } else {
            usernameContainer.setCustomValidity("");
        }

        setUsername(usernameContainer.value)
    }

    function handlePasswordChange(event) {
        const passwordContainer = document.getElementById("inputField-input-password")

        if(passwordContainer.value.length > 50) {
            passwordContainer.setCustomValidity("The size of the username must be less than 50 characters");
        } else {
            passwordContainer.setCustomValidity("");
        }

        setPassword(passwordContainer.value)
    }


    return (
        <div id="login-container">
            <NavBarHome nav={"signin"} btnContent={"Sign In"}/>

            <div onClick={() => setDisplayPopup(true)} id="login-title">Login</div>

            <div id="login-descr">Free forever. No payment needed.</div>

            <form id="login-form" onSubmit={handleSubmitForm}>
                <InputField name={"Username"} type={"text"} placeholder={"Enter your username"} required={true} onChange={handleUsernameChange}/>
                <InputField name={"Password"} type={"password"} placeholder={"Enter your password"} required={true} onChange={handlePasswordChange}/>
                <ButtonForm content={"Login"} size={3} align={'center'}/>
            </form>

           { displayPopup
                ? <Popup closePopUp={() => setDisplayPopup(false)}> 
                    <div id="login-popup-title">Double authentification</div>
                    <div id="login-popup-user">Hello {username}</div>
                    <div id="login-popup-descr">Please enter the code obtained on the double authentication application <br/>(google authenticator)</div>
                    <form id="login-popup-form" onSubmit={handleSubmitPopup}>    
                        <InputField onChange={handleCodeChange} name={"Code secret"} type={"number"} placeholder={"Entrer votre code à 6 chiffres"} required={true} />
                        <ButtonForm content={"Login"} size={1} align={'center'}/>
                    </form>
                </Popup>
                : null
           }

            

            <NavLink end to="/signin" id="login-toSignin">Do not have an account yet?</NavLink>


            <Footer/>

            { isLoading
                ? <Loading/>
                : null
            }
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };

export default Login;