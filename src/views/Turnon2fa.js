import React, {useState, useEffect} from "react";
import Footer from "../components/Footer";
import NavBarHome from "../components/NavBarHome";



import "../styles/Turnon2fa.css";

import googlePlay from "../assets/googlePlay.jpg"
import appStore from "../assets/appStore.jpg"
import InputField from "../components/InputField";
import ButtonForm from "../components/ButtonForm";

import {api} from '../configApi'
import Loading, {openLoading, closeLoading} from "../components/Loading";


async function apiTurnOnDoubleAuth(credentials) {
    return fetch(api.url + '/2fa/turn-on', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

async function apiGenerateDoubleAuth(credentials) {
    return fetch(api.url + '/2fa/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

function Turnon2fa({userToken}) {
    const [code, setCode] = useState();
    const [qrcode, setQrcode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleCodeChange(event) {
        const codeContainer = document.getElementById("inputField-input-codesecret")

        if(codeContainer.value.length !== 6) {
            codeContainer.setCustomValidity("Code size must be 6 digits");
        } else {
            codeContainer.setCustomValidity("");
        }

        setCode(codeContainer.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let myInterval = openLoading(setIsLoading, 2)
        const result = await apiTurnOnDoubleAuth({
          token: userToken,
          usertwoFACode: code
        });

        closeLoading(setIsLoading, myInterval)

        if(result.message === "2FA enabled") {
            window.location.replace("/dashboard")
        }
    }

    useEffect(() => {
        async function fetchAPI() {
            let myInterval = openLoading(setIsLoading, 2)
            const result = await apiGenerateDoubleAuth({
                token: userToken,
            }); 
            if(result.message === "Generate successful") {
                setQrcode(result.UrlQRCode)
            } else {
                alert("Error. Double authentification already actived")
                window.location.replace("/dashboard")
            }
            closeLoading(setIsLoading, myInterval)
          }
      
          fetchAPI()
      }, [userToken])
      
    
    return (
        <div id="turnon2fa-container">
            <NavBarHome nav={"dashboard"} btnContent={"Go to Dashboard"}/>

            <div id="turnon2fa-content">
                <div className="turnon2fa-content-item">
                    <h2>2FA what is it?</h2>
                    <div className="turnon2fa-text" style={{margin: "unset"}}>Two-factor authentication adds an additional authentication method to your account and therefore adds security. This consists of adding a code that is automatically generated via the google authenticator application. At each connection, you will need to enter this 6-digit secret code.</div>
                </div>

                <div className="turnon2fa-content-item">
                    <div className="turnon2fa-text">1. Download the google authenticator app in your phone:</div>
                    <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=fr&gl=US"><img style={{width: "120px", height: "auto"}} src={googlePlay} alt="Google Play"/></a>
                    <a href="https://apps.apple.com/us/app/google-authenticator/id388497605"><img style={{width: "120px", height: "auto"}} src={appStore} alt="Apple Store"/></a>
                </div>

                <div className="turnon2fa-content-item">
                    <div className="turnon2fa-text">2. Once downloaded,<br/>scan the qr code with the application</div>
                    <img style={{width: "140px", height: "auto"}} src={qrcode} alt="Qrcode Google Authentificator"/>
                </div>

                <div className="turnon2fa-content-item">
                    <div className="turnon2fa-text">3. Enter the code obtained with the application</div>
                    <form onSubmit={handleSubmit}>
                        <InputField onChange={handleCodeChange} name={"Code secret"} type={"number"} placeholder={"Entrer votre code à 6 chiffres"} required={true} />
                        <ButtonForm content={"Validate"} size={1} align={'center'}/>
                    </form>
                </div>
            </div>
            

            <Footer/>

            { isLoading
                ? <Loading/>
                : null
            }
        </div>
    );
}

export default Turnon2fa;