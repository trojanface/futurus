import React, { useState, useEffect } from 'react'

export default function Checkbox(props) {
    const [state, setstate] = useState(false) //stores the state of the checkbox
    useEffect(() => {
        setstate(props.check)
    }, [props.check])
    return (

        <div className="row">
            <div className="col-md-4">
                {props.title}
            </div>
            <div className="col-md-8">
                <input type="checkbox" onChange={() => props.changeValue(props)} checked={state} data-toggle="toggle"></input>
            </div>
        </div>
    )
}
