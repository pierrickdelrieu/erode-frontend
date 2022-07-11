import React from "react";

import "../styles/InputField.css"






function InputField({name, type, required, placeholder, onChange}) {

    return (
        <div className="inputField">
            { required
                ? <label className="inputField-label" htmlFor={name.replace(' ', '').toLowerCase()}>{name} <strong className="inputField-label-star">*</strong></label>
                : <label className="inputField-label" htmlFor={name.replace(' ', '').toLowerCase()}>{name}</label>
            }
            
            <input onChange={onChange} className="inputField-input" type={type} id={"inputField-input-" + name.replace(' ', '').toLowerCase()} name={name} placeholder={placeholder} required={required}></input>

        </div>
    );
}

export default InputField;