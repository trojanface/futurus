import React, { useState, useContext } from 'react'
import './style.css'
import API from '../../utils/API';
import { store } from '../../GlobalStore'
import { Redirect } from 'react-router-dom';
import Validator from '../../utils/Validator';
import { NotificationContainer } from 'react-notifications'
import createNotification from '../../components/CheckBox/Notification';
import backImage from './assets/futurusbackground.png'
import logo from './assets/futuruslogowhite.png'

export default function Login() {
    //intialisation of state and variables
    const [username, setUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const { state, setState } = useContext(store);

    //interprets a change in the username input box
    function updateUsername(event) {
        setUsername(event.target.value);
    }

    //interprets a change in the password input box
    function updatePass(event) {
        setUserPassword(event.target.value)
    }

    //sends the user information off for verification and if so then logs the user into the global store and redirects to the dashboard
    function login(event) {
        event.preventDefault();
        if (Validator.isInputEmpty(username) === false && Validator.isInputEmpty(userPassword) === false) {
            API.login({ username, userPassword }).then((res) => {
                setState({
                    totTime: res.data.totTime, totalTrans: res.data.totalTrans, user_id: res.data.user_id, firstName: res.data.firstName, lastName: res.data.lastName, POS: res.data.POS, advertising: res.data.advertising,
                    balances: res.data.balances, cashDrops: res.data.cashDrops, email: res.data.email, itemDesigner: res.data.itemDesigner, keyLayout: res.data.keyLayout, adminLevel: res.data.adminLevel,
                    membership: res.data.membership, refunds: res.data.refunds, reports: res.data.reports, stocktake: res.data.stocktake, userDesigner: res.data.userDesigner
                });
            }).catch((err) => {
                createNotification('error', 'Error', 'Username or password are not correct', 4000);
            })
        } else {
            createNotification('error', 'Error', 'Login fields cannot be blank', 4000);
        }
    }
    if (state != 0) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div style={{height:'100vh', width:'100vw',backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(${backImage})` }}>
            <NotificationContainer />
            <div className="row no-gutters ">
                <div className="col-md-4">
                    <div className="row mt-4">
                        <div className="col-md-12">
                        <img style={{width:'100%'}} src={require('./assets/futuruslogowhite.png')} />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center loginVert">
                    <form onSubmit={login}>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <input className="inputBox" value={username} onChange={updateUsername} type="text" placeholder="Username" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <input className="inputBox" value={userPassword} onChange={updatePass} type="password" placeholder="Password" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <button className="greenButton">Login</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <a href="#">Forgot your username/password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-12 loginContactVert">
                    <div className="row no-gutters">
                        <div className="col-md-12  d-flex justify-content-center">
                            <p>Don't have an account?</p>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="offset-md-4"></div>
                        <div className="col-md-4  d-flex justify-content-center">
                            <button className="greenButton butt25">Contact Us</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
