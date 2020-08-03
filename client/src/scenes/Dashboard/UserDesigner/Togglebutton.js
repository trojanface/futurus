import React, { useState, useEffect } from 'react'

export default function Togglebutton(props) {
    const [state, setstate] = useState('Disabled') //stores the state of the toggle button

    useEffect(() => { //toggles the value of the button
        if (props.storedValue === true) {
            setstate('Enabled')
        } else {
            setstate('Disabled')
        }
    }, [props.storedValue])

    return (
        <div className="row">
            <div className="col-md-4">
                {props.title}
            </div>
            <div className="col-md-8">
                <button className={`${state} butt50 mtb-2`} onClick={() => {
                    props.toggleFunc(props.storedSelection, props.storedElement);
                }} >{`${state}`}</button>
            </div>
        </div>
    )
}
