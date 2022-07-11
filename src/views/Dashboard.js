import React, {useState, useEffect} from "react";
import NavBarDashboard from "../components/NavBarDashboard";
import Footer from "../components/Footer";
import ButtonForm from "../components/ButtonForm";

import writeImg from "../assets/write.svg"
import notifImg from "../assets/notif.svg"

import {api} from '../configApi'

import "../styles/Dashboard.css";
import Message from "../components/Message";
import { removeToken } from "../components/utils/useToken";
import Loading, {openLoading, closeLoading} from "../components/Loading";



async function getUserInfo(credentials) {
    return fetch(api.url + '/getInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

async function sendMessage(credentials) {
    return fetch(api.url + '/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}


async function getMessages(credentials) {
    return fetch(api.url + '/getMessages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}



function checkInputMessage(message) {
    // for(int element: message) {
    //     if((element < 0) || (element > 127)) {
    //         return false;
    //     }
    // }
    return true;
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


function Dashboard({token}) {
    const [doubleAuth, setdoubleAuth] = useState(true);

    const [recipientForm, setRecipientForm] = useState(null);
    const [username, setUsername] = useState(null);
    const [tagcode, setTagcode] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [messageForm, setMessageForm] = useState(null);


    const [messages, setMessages] = useState(null);
    const [time, setTime] = useState(0.5);

    


    function handleChangeRicipient(event) {
        const element = document.getElementById("dashboard-writeMessage-recipient")

        if(!element.value.includes('@')) {
            element.setCustomValidity("Recipient must contain a @ with digit");
        } else {
            element.setCustomValidity("");
        }

        setRecipientForm(element.value)
    }


    useEffect(() => {
        async function fetchAPI() {
            let interval = openLoading(setIsLoading, 1)

            const resultGetInfo = await getUserInfo({
                token: token,
            }); 

            const resultGetMessage = await getMessages({
                token: token,
            });



            if(resultGetMessage.message === "No messages found") {
                setMessages(null)
            } else {
                setMessages(resultGetMessage.array)
            }


            if(resultGetInfo.message === "Invalid token") {
                removeToken()
                window.location.replace("/login")
            } else {
                setdoubleAuth(resultGetInfo.is2FAEnabled)
                setUsername(resultGetInfo.username)
                setTagcode(resultGetInfo.tagcode)
            }

            closeLoading(setIsLoading, interval)
        }

        fetchAPI()

         
    }, [token, setIsLoading])


    function handleMessageChange() {
        const message = document.getElementById("dashboard-writeMessage-message")

        if(!checkInputMessage(message)) {
            message.setCustomValidity("The message must contain characters from the ascii table (between 0 and 127)");
        } else {
            setMessageForm(message.value)
        }
    }


    const handleSubmit = async e => {
        e.preventDefault();
        let interval = openLoading(setIsLoading, 2)

        const credit = getUsernameTagcode(recipientForm)

        const usernamef = credit.username
        const tagcodef = credit.tagcode

        const response = await sendMessage({
            token: token,
            content: messageForm,
            usernameTarget: usernamef,
            tagcodeTarget: tagcodef,
            time: time
        });
        console.log(time)

        alert(response.message)

        closeLoading(setIsLoading, interval)
    }


    return (
        <div id="dashboard-container">
            <NavBarDashboard doubleAuth={doubleAuth} setdoubleAuth={setdoubleAuth} username={username + "@" + tagcode} token={token}/>

            <div id="dashboard-content">

                <div id="dashboard-content-nav">
                    <a href="#dashboard-content-messages">My messages</a>
                    <a href="#dashboard-writeMessage">Writes message</a>
                </div>


                <div id="dashboard-content-messages" className="dashboard-content-item">
                        <div id="dashboard-content-messages-title">
                            <h2>My messages</h2>
                            <img src={notifImg} alt="Notifications"/>
                        </div>

                        { messages
                            ? messages.map((message) =>
                                <Message key={message.id} id={message.id} recipient={message.fromUsername + '@' + message.fromTagCode} timeAgo={message.timeSending} timeExpire={message.timeDelete}/>
                            )
                            : <p id="dashboard-content-messages-nomessage">No Message</p>
                        }
                </div>

                <form id="dashboard-writeMessage" className="dashboard-content-item" onSubmit={handleSubmit}>
                    <div id="dashboard-writeMessage-title">
                        <h2>Write new message</h2>
                        <img src={writeImg} alt="Write"/>
                    </div>

                    <input id="dashboard-writeMessage-recipient" type={"text"} name={"recipient"} placeholder={"Recipient *"} onChange={handleChangeRicipient} required maxLength={25}/>

                    <div id="dashboard-writeMessage-time">
                        <label htmlFor="timeSelect">The message will self-destruct after reading or after: </label>

                        <select name="timeSelect" id="dashboard-writeMessage-time-select" onChange={e => setTime(e.target.value)}>
                            <option value={0.5}>30 min</option>
                            <option value={2}>2h</option>
                            <option value={4}>6h</option>
                            <option value={4}>12h</option>
                            <option value={24}>24h</option>
                        </select>
                    </div>

                    <textarea onChange={handleMessageChange} id="dashboard-writeMessage-message" rows="40" cols="33" placeholder="Message" maxLength={500} required></textarea>

                    <div id="dashboard-writeMessage-button">
                        <ButtonForm content={"Send"} size={1} align={'center'}/>
                    </div>

                </form>

                { isLoading
                    ? <Loading/>
                    : null
                }
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;