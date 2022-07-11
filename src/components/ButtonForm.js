import React from "react";

import "../styles/ButtonForm.css"

function ButtonForm({content, size, align}) {

    return (
        <input className="button-form" style={{width:  + size * 120 + 'px'}}
        type="submit" value={content}/>
    );
}




export default ButtonForm;