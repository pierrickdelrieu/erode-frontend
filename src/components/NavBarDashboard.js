import React, {useState} from "react";


import "../styles/NavBarDashboard.css"
import Name from "./Name";

import account from "../assets/account.png"
import ToggleButton from "./ToggleButton";


import { removeToken } from "./utils/useToken";
import Popup from '../components/Popup';

import ButtonForm from "../components/ButtonForm"
import InputField from "../components/InputField"

import {api} from '../configApi'
import Loading, {openLoading, closeLoading} from "../components/Loading";



async function turnOffDoubleAuth(credentials) {
    return fetch(api.url + '/2fa/turn-off', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

async function logout(credentials) {
    return fetch(api.url + '/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

async function deleteAccount(credentials) {
    return fetch(api.url + '/deleteUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

function NavBarDashboard({doubleAuth, setdoubleAuth, username, token}) {
    const chevron = ">"

    const [displayPopUpRemoveDoubleAuth, setDisplayPopUpRemoveDoubleAuth] = useState(false);
    const [codeRemoveDoubleAuth, setCodeRemoveDoubleAuth] = useState(null);

    const [isLoading, setIsLoading] = useState(false);



    async function handleClickLogout() {
        if(window.confirm("Once logged out, you will need your username and tagcode to log in. Your full username is: " + username)) {
            let myInterval = openLoading(setIsLoading, 2)
            const response = await logout({
            token: token
            });
            closeLoading(setIsLoading, myInterval)
            
            
            removeToken()
            window.location.replace("/login")
        }
    }

    async function handleClickDelete() {
        if(window.confirm("Are you sure you want to delete your account? The messages you sent will be deleted.")) {
            let myInterval = openLoading(setIsLoading, 2)
            const response = await deleteAccount({
            token: token
            });
            closeLoading(setIsLoading, myInterval)

            removeToken()
            window.location.replace("/login")
        }
    }

    const handleSubmitPopup = async e => {
        e.preventDefault()

        let myInterval
        openLoading(setIsLoading, myInterval)
        const response = await turnOffDoubleAuth({
          token: token,
          usertwoFACode: codeRemoveDoubleAuth
        });

        if(response.message === "Invalid information" ) {
            alert("Wrong credits")
        } else {
            window.location.reload()
        }
        closeLoading(setIsLoading, myInterval)
        
    }

    function handleCodeChange(event) {
        const codeContainer = document.getElementById("inputField-input-codesecret")

        if(codeContainer.value.length !== 6) {
            codeContainer.setCustomValidity("Code size must be 6 digits");
        } else {
            codeContainer.setCustomValidity("");
        }

        setCodeRemoveDoubleAuth(codeContainer.value)
    }


    function handleClickToggleDoubleAuth() {
        // setdoubleAuth(!doubleAuth); 
        if (!doubleAuth) {
            window.location.replace("/turnon2fa")
        } else {
            setDisplayPopUpRemoveDoubleAuth(true)
        }
    }

    function closePopUpRemoveDoubleAuth() {
        setDisplayPopUpRemoveDoubleAuth(false)
    }

    return (
        <div id="navbar-dashboard">
            <Name/>

            <div id="navbar-dashboard-account">
                <div id="navbar-dashboard-account-content">
                    <img src={account} alt="Account"/>
                    <p>{username}</p>
                </div>
                <p onClick={handleClickLogout} id="navbar-dashboard-logout">Logout {chevron}</p>
                <p onClick={handleClickDelete} id="navbar-dashboard-delete">Delete account {chevron}</p>
                <div id="navbar-dashboard-account-doubleAuth" onClick={handleClickToggleDoubleAuth}>
                    <ToggleButton active={doubleAuth}/>
                    <p>2FA</p>
                </div>
            </div>
            { displayPopUpRemoveDoubleAuth
                ? <Popup closePopUp={closePopUpRemoveDoubleAuth}> 
                    <div id="removeDoubleAuth-popup-title">Remove Double Authentification</div>
                    <div id="removeDoubleAuth-popup-descr">Please enter the obtained code on the two-factor authentication app to remove the feature. In case of problem do not hesitate to <a href="/#home-third-title" onClick={() => setDisplayPopUpRemoveDoubleAuth(false)}>contact us.</a><br/>(google authenticator)</div>
                    <form id="removeDoubleAuth-popup-form" onSubmit={handleSubmitPopup}>    
                        <InputField onChange={handleCodeChange} name={"Code secret"} type={"number"} placeholder={"Entrer votre code à 6 chiffres"} required={true} />
                        <ButtonForm content={"Validate"} size={1} align={'center'}/>
                    </form>
                </Popup>
                : null
           }
           { isLoading
                ? <Loading/>
                : null
            }
        </div>
    );
}

export default NavBarDashboard;