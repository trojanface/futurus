import React, { useState } from 'react'

export default function Inputbox(props) {
    const [textVal, setTextVal] = useState(""); //stores the text value of the input box

    function handleChange({ target }) {//sends the text value back to the parent component.
        setTextVal(target.value)
        props.changeValue([props, target.value])
    }
    return (
        <div className="row">
            <div className="col-md-4">
                <label>
                    {props.title}
                </label>
            </div>
            <div className="col-md-8">
                <input type={props.type ? "password" : "text"} value={textVal} onChange={handleChange} placeholder={props.placehold}></input>
            </div>
        </div>
    )
}
