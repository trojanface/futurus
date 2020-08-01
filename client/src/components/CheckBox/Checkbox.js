import React, {useState,useEffect} from 'react'

export default function Checkbox(props) {
//pretty sure the answer is state so it rerenders
const [state, setstate] = useState(false)


useEffect(() => {
    setstate(props.check)
    console.log("nejfns")
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
