import React, { useContext, useState, useEffect } from 'react'
import './style.css'
import { store } from '../../GlobalStore'
import { Redirect } from 'react-router-dom';
export default function Dashboard() {
    const globalState = useContext(store);
    const [screen, setScreen] = useState(0);

    // useEffect(() => {
    //    if (globalState.state[])
    // }, [screen])

    switch (screen) {
        case 1:
            return <Redirect to='/pos' />

        case 2:
            return <Redirect to='/userdesigner' />

        case 3:
            return <Redirect to='/itemdesigner' />

        case 4:
            return <Redirect to='/pos' />

        case 5:
            return <Redirect to='/pos' />

        case 6:
            return <Redirect to='/stocktake' />

        case 7:
            return <Redirect to='/pos' />

        case 8:
            return <Redirect to='/pos' />

        case 9:
            return <Redirect to='/pos' />

        case 10:
            console.log("logging out")
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
//TODO needs to query upon login to check the users permissions and then load the appropriate menus