import React, {useEffect} from "react";


import "../styles/Popup.css"






function Popup({closePopUp, children}) {

  
    const handleChildClick = event => {
        event.stopPropagation();
    };

    useEffect(() => {
        document.body.style = "overflow-y: hidden"
    });

    const close = () => {
        document.body.style = "overflow-y: unset"
        closePopUp();
    }


    return (
        <div id="popup-container" onClick={close}>
            <div id="popup-container-content" onClick={handleChildClick}>
                {children}
            </div>
        </div>
    );
}

export default Popup;