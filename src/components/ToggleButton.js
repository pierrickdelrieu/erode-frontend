import React from "react";



import "../styles/ToggleButton.css";


function ToggleButton({active}) {


    return (
        <div id="toggleButton-rect" className={active ? "toggleButton-rect-active" : "toggleButton-rect-inactive"}>
            <div id="toggleButton-round" className={active ? "toggleButton-round-active" : "toggleButton-round-inactive"}></div>
        </div>
    );
}

export default ToggleButton;