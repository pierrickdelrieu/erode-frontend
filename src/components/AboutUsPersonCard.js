import React from "react";

import "../styles/AboutUsPersonCard.css"

function AboutUsPersonCard({img, name, jobProject, jobTech, email}){
    return(
        <div className={"person-card"}>
            <img src={img} alt={"User"}/>
            <div className="person-card-name">{name}</div>
            <div className="person-card-item">{jobProject}</div>
            <div className="person-card-item">{jobTech}</div>
            <a href={"mailto:" + email} className="person-card-item">{email}</a>
        </div>
    )
}
export default AboutUsPersonCard;