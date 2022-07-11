import React from "react";
import Footer from "../components/Footer";
import "../styles/Home.css";
import NavBarHome from "../components/NavBarHome";
import { getToken } from "../components/utils/useToken";

import imgHome from "../assets/home.png"
import add1 from "../assets/add1.png"
import add2 from "../assets/add2.png"
import AboutUsPersonCard from "../components/AboutUsPersonCard";


import kylian from "../assets/kylian.jpg"
import meric from "../assets/meric.jpg"
import pierrick from "../assets/pierrick.png"
import guillaume from "../assets/guillaume.jpg"
import jeremy from "../assets/jeremy.jpg"
import raphael from "../assets/raphael.jpg"






function Home() {

    return (
        <div id="home-container">

            <div id="home-first">
                { getToken() !== null
                    ? <NavBarHome nav={"dashboard"} btnContent={"Go to Dashboard"}/>
                    : <NavBarHome nav={"signin"} btnContent={"Sign In"}/>
                }

                <div id="home-text">
                    <div id="home-text-title">Secure your message conversations</div>
                    <div id="home-text-subtitle">Send confidential information</div>
                </div>

                <img id="home-img" src={imgHome} alt="Home"/>

                <div id="home-name">with ERØDƎ</div>
            </div>


            <div id="home-second">
                <div id="home-second-adds">
                    <img id="home-second-adds1" src={add1} alt="Add 1"/>
                    <img src={add2} alt="Add 2"/>
                </div>
                
                <div id="home-second-content">
                    <p>Privacy</p>
                    <p>Integrity</p>
                    <p>Availablity</p>
                    <p>Traceability</p>
                </div>
            </div>


            <div id="home-third">
                <div id="home-third-title">About us</div>

                <div id="home-third-content">
                    <AboutUsPersonCard img={raphael} name={"Raphael Cadillat"} jobProject={"Scrib"} jobTech={"Front end Manager"} email={"raphael.cadillat@efrei.net"}/>
                    <AboutUsPersonCard img={pierrick} name={"Pierrick Delrieu"} jobProject={"Project Manager"} jobTech={"Front end Manager"} email={"pierrick.delrieu@efrei.net"}/>
                    <AboutUsPersonCard img={jeremy} name={"Jéremy Grelaud"} jobProject={"Time Keeper"} jobTech={"Data Manager"} email={"jeremy.grelaud@efrei.net"}/>
                    <AboutUsPersonCard img={guillaume} name={"Guillaumes Dumas"} jobProject={"Speaker"} jobTech={"Encryption Manager"} email={"guillaume.dumas@efrei.net"}/>
                    <AboutUsPersonCard img={meric} name={"Méric Chenu"} jobProject={"Speaker"} jobTech={"Back End Manager"} email={"meric.chenu@efrei.net"}/>
                    <AboutUsPersonCard img={kylian} name={"Kylian Artu-Lequint"} jobProject={"Observer"} jobTech={"Back End Manager"} email={"kylian.artu-lequint@efrei.net"}/>
                </div>

            </div>




            <Footer/>

        </div>

    );
}

export default Home;
