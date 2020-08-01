import React, { useState, useContext } from 'react'
import './style.css'
import API from '../../utils/API';
import { store } from '../../GlobalStore'
import { Redirect } from 'react-router-dom';


export default function Login() {
   

    const [username, setUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const { state, setState } = useContext(store);
    // const { dispatch } = globalState;
    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePass(event) {
        setUserPassword(event.target.value)
    }

    function login(event) {
        event.preventDefault();
        API.login({ username, userPassword }).then((res) => {

            console.log(res.data)
          

            setState({totTime: res.data.totTime, totalTrans: res.data.totalTrans, user_id: res.data.user_id, firstName: res.data.firstName, lastName: res.data.lastName, POS: res.data.POS, advertising: res.data.advertising,
            balances: res.data.balances, cashDrops: res.data.cashDrops, email: res.data.email, itemDesigner: res.data.itemDesigner, keyLayout: res.data.keyLayout,
        membership: res.data.membership, refunds: res.data.refunds, reports: res.data.reports, stocktake: res.data.stocktake, userDesigner: res.data.userDesigner});


        }).catch((err) => {
            console.log(err)
        })
    }
    if (state != 0) {
        return <Redirect to='/userdesigner' />
    }

    return (
        <div>

            <div className="row no-gutters ">
                <div className="col-md-4">
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <h1 className="mainHeading ml-12">Futurus</h1>
                            <h3 className="subHeading ml-12">The POS of the future</h3>
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
