import React, { useContext, useState, useEffect } from 'react'
import './style.css'
import { store } from '../../GlobalStore'
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';
export default function Dashboard(props) {
    const globalState = useContext(store);
    const [screen, setScreen] = useState(0);

    useEffect(() => {
        if (globalState.state === 0) {
            setScreen(10);
        }
    }, [])

    switch (screen) {//switches between screens based on menu selection
        case 1:

            return <Redirect to='/pos' />


        case 2:
            if (props.screen != screen) {
                return <Redirect to='/userdesigner' />
            } else {
                break;
            }
        case 3:
            if (props.screen != screen) {
                return <Redirect to='/itemdesigner' />
            } else {
                break;
            }
        case 4:
            // return <Redirect to='/pos' />
            break;
        case 5:
            // return <Redirect to='/pos' />
            break;
        case 6:
            if (props.screen != screen) {
                return <Redirect to='/stocktake' />
            } else {
                break;
            }
        case 7:
            if (props.screen != screen) {
            return <Redirect to='/reports' />
        } else {
            break;
        }
        case 8:
            // return <Redirect to='/pos' />
            break;
        case 9:
            // return <Redirect to='/pos' />
            break;
        case 10:
            console.log("logging out")
            API.logOut();
            globalState.state = 0;
            return <Redirect to='/logout' />

        default:
            break;
    }
    return (
        <div>

            <h1 className="mainHeading">Futurus</h1>
            <h5 className="smallSubText pt-12">Welcome {globalState.state.firstName}</h5>
            <ul className="noStyle">
                {globalState.state.POS ?
                    <li key="1">
                        <button className="blueButton butt75 mtb-2" onClick={() => setScreen(1)}>POS</button>
                    </li>
                    : <></>}
                {globalState.state.userDesigner ?
                    <li key="2">
                        <button className="blueButton butt75 mtb-2" onClick={() => setScreen(2)}>User Designer</button>
                    </li>
                    : <></>}
                {globalState.state.itemDesigner ?
                    <li key="3">
                        <button className="blueButton butt75 mtb-2" onClick={() => setScreen(3)}>Item Designer</button>
                    </li>
                    : <></>}
                {globalState.state.keyLayout ?
                    <li key="4">
                        <button className="blueButton butt75 mtb-2" onClick={() => setScreen(4)}>POS Layout Editor</button>
                    </li>
                    : <></>}
                {globalState.state.balances ?
                    <li key="5">
                        <button className="blueButton butt75 mtb-2" onClick={() => setScreen(5)}>User Balance</button>
                    </li>
                    : <></>}
                {globalState.state.stocktake ?
                    <li key="6">
                        <button className="blueButton butt75 mtb-2" onClick={() => setScreen(6)}>Stocktake</button>
                    </li>
                    : <></>}
                {globalState.state.reports ?
                    <li key="7">
                        <button className="blueButton butt75 mtb-2" onClick={() => setScreen(7)}>Reports</button>
                    </li>
                    : <></>}
                {globalState.state.membership ?
                    <li key="8">
                        <button className="blueButton butt75 mtb-2" onClick={() => setScreen(8)}>Membership</button>
                    </li>
                    : <></>}
                {globalState.state.advertising ?
                    <li key="9">
                        <button className="blueButton butt75 mtb-2" onClick={() => setScreen(9)}>Advertising</button>
                    </li>
                    : <></>}

                <li key="10">
                    <button className="blueButton butt75 mtb-2" onClick={() => setScreen(10)}>Sign Out</button>
                </li>

            </ul>

        </div>
    )
}
