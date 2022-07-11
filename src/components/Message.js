import React, {useState} from "react";

import "../styles/Message.css"

import Popup from "../components/Popup"
import ButtonForm from "../components/ButtonForm"

import eyeImg from "../assets/eye.svg"
import arrowImg from "../assets/arrow.svg"

import {api} from '../configApi'
import { getToken } from "./utils/useToken";
import Loading, {openLoading, closeLoading} from "../components/Loading";



async function getMessage(credentials) {
    return fetch(api.url + '/getMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}


function formatDate(content) {
    if(content.includes(':')) {
        const data = content.split(":")

        if(data[0] == "00") {
            return data[1] + " min"
        } else {
            return data[0] + " h " + data[1] + " min"
        }
        
    } 

    return ""
}

function Message({id, recipient, timeAgo, timeExpire}) {
    const [displayPopUpMessage, setDisplayPopUpMessage] = useState(false);
    const [contentValue, setContent] = useState("");
    const [recipientValue, setRecipient] = useState(recipient);
    const [timeAgoValue, setTimeAgo] = useState(timeAgo);
    const [timeExpireValue, setTimeExpire] = useState(timeExpire);
    const [isLoading, setIsLoading] = useState(false);


    function handleClosePopUp(event) {
        document.body.style = "overflow-y: unset"
        alert("Once closed, the message will be deleted")
        setDisplayPopUpMessage(false)
        window.location.reload()
    }

    async function handleOpenPopUp(event) {
        event.preventDefault();

        const token = getToken()

        let myInterval = openLoading(setIsLoading, 2)
        const response = await getMessage({
            token: token,
            id_message: id
          });
        
        closeLoading(setIsLoading, myInterval)

        if(response.message === "Success") {
            setContent(response.item.content)
            setRecipient(response.item.fromUsername + '@' + response.item.fromTagCode)
            setTimeAgo(response.item.timeSending)
            setTimeExpire(response.item.timeDelete)
            setDisplayPopUpMessage(true)
        } else {
            alert("Message expired")
            window.location.reload()
        }
    }


    return (
        <div>
            <div className="message" onClick={handleOpenPopUp}>
                <div className="message-recipient">From<pre className="message-recipient-strong"> {recipientValue}</pre></div>
                <div className="message-timeAgo">
                    <p>{timeAgoValue} ago</p>
                    <img src={arrowImg} alt={"Arrow"}/>
                </div>
                <div className="message-timeExpire">
                    <img src={eyeImg} alt={"Eye"}/>
                    <p>Expires in {formatDate(timeExpireValue)}</p>
                </div>
            </div>

            <div id="message-popup">
            { displayPopUpMessage
                ? <Popup closePopUp={handleClosePopUp}> 
                    <div id="message-popup-title">Message</div>
                    <div id="message-popup-header">
                        <div className="message-popup-header-item">From<pre> {recipientValue}</pre></div>
                        <div className="message-popup-header-item">{timeAgoValue} ago</div>
                    </div>
                    <div id="message-popup-content">{contentValue}</div>
                    <form id="message-popup-button" onSubmit={handleClosePopUp}><ButtonForm content={"Ok"} size={1}/></form>
                </Popup>
                : null
            }

            { isLoading
                ? <Loading/>
                : null
            }
            </div>
        </div>
    );
}

export default Message;