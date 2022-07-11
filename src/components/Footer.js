import React from "react";


import footer from "../assets/footer.png";


import "../styles/Footer.css"



function Footer() {

    return (
        <div id="footer">
            <img src={footer} alt="Footer"/>
            <p id={"copyright"}> © 2022 Erode All Rights Reserved
                <br/><a id={"rgpd"} href={'/RGPD'}>Terms of use</a>
            </p>
        </div>
    );
}

export default Footer;