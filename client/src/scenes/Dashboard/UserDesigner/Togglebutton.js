import React, {useState,useEffect} from 'react'

export default function Togglebutton(props) {
// //pretty sure the answer is state so it rerenders
const [state, setstate] = useState('Disabled')


// useEffect(() => {
//     setstate(props.storedValue)
//     console.log(state)
// }, [,state])

// function toggleMe () {
//     setstate(!state)
// }

useEffect(() => {
// console.log("props changed")
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
                // toggleMe();
            }} >{`${state}`}</button>
            {/* <input type="checkbox" onChange={() => props.changeValue(props)} checked={state} data-toggle="toggle"></input> */}
        </div>
    </div>
    )
}
