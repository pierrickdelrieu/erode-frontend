import React from "react";
import { NavLink } from "react-router-dom";


import "../styles/NavBarHome.css"
import Name from "./Name";






function NavBarHome({nav, btnContent}) {

    return (
        <div id="navbar-home">
            <Name/>

            <NavLink id="navbar-home-btn" end to={"/" + nav}>{btnContent}</NavLink>
        </div>
    );
}

export default NavBarHome;