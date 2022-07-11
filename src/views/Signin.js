import React, {useEffect, useState} from "react";
import InputField from "../components/InputField";
import ButtonForm from "../components/ButtonForm";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

import {api} from '../configApi'


import "../styles/Login.css"
import "../styles/Signin.css"
import NavBarHome from "../components/NavBarHome";
import useWindowDimensions from "../components/utils/UseWindowsDimension";
import Loading, {openLoading, closeLoading} from "../components/Loading";



async function registerUser(credentials) {
    return fetch(api.url + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}


function Signin({setToken}) {
    let { height } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(false);


    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        if(height <= 680) {
            document.getElementById("footer").style.display = "none"
        } else {
            document.getElementById("footer").style.display = "block"
        }        
    });

    
    function handlePasswordChange(event) {
        const confirmPassword = document.getElementById("inputField-input-confirmpassword")
        const password = document.getElementById("inputField-input-password")

        if(password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("The two passwords are not identical");
        } else if(password.value.length > 50) {
            password.setCustomValidity("The size of the username must be less than 50 characters");
        }else {
            confirmPassword.setCustomValidity("");
        }

        if(password.value.match("(?=^.{8,}$)(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*]+)")) {
            password.setCustomValidity("");
        } else {
            password.setCustomValidity("Password must contain at least:\n- 8 characters\n- a capital letter\n- a lowercase\n- a number\n- a special character [!@#$%^&*]+\n");
        }

        setPassword(password.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let myInterval = openLoading(setIsLoading, 2)
        const content = await registerUser({
          username: username,
          password: password,
        });
        closeLoading(setIsLoading, myInterval)
        setToken(content.token);
        window.location.reload()
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


    return (
        <div id="signin-container">
            <NavBarHome nav={"login"} btnContent={"Login"}/>

            <div id="signin-title">Signin</div>

            <form id="signin-form" onSubmit={handleSubmit}>
                <InputField name={"Username"} type={"text"} placeholder={"Enter your username"} required={true} onChange={handleUsernameChange}/>
                <InputField onChange={handlePasswordChange} name={"Password"} type={"password"} placeholder={"Enter your password"} required={true}/>
                <InputField onChange={handlePasswordChange} name={"Confirm password"} type={"password"} placeholder={"Enter your password"} required={true}/>
                <div id="signin-form-checkbox">
                    <input type={"checkbox"} required/>
                    <label>By creating an account you are agreeing to our <a href={'/RGPD'}>Terms and Conditions and Privacy Policy</a></label>
                </div>
                <ButtonForm content={"Sign in"} size={3} align={'center'}/>
            </form>

            <NavLink end to="/login" id="signin-toLogin">Already have an account?</NavLink>


            <Footer/>

            { isLoading
                ? <Loading/>
                : null
            }
        </div>
    );
}

export default Signin;