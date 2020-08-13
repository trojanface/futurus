import React, { useContext, useState, useEffect } from 'react'
import './style.css'
import API from '../../utils/API'
import Inputbox from '../../components/CheckBox/Inputbox'
import Dashboard from '../Dashboard/Dashboard'
import Togglebutton from './Togglebutton'
import createNotification from '../../components/CheckBox/Notification'
import { NotificationContainer } from 'react-notifications'
import { store } from '../../GlobalStore'
import TitleBar from '../Dashboard/TitleBar'

export default function UserDesigner() {
    //initialise state and variables
    const [userList, setUserList] = useState([])
    const [selected, setSelect] = useState(0)
    const [testState, setTestState] = useState(false)
    const { state, setState } = useContext(store);
    let password1 = "";
    let password2 = "";
    let password3 = "";
    const permissions = ["POS", "userDesigner", "itemDesigner", "keyLayout", "stocktake", "reports", "membership", "advertising", "refunds", "cashDrops", "balances"];
    const permissionsText = ["POS", "User Designer", "Item Designer", "Key Layout", "Stocktake", "Reports", "Membership", "Advertising", "Refunds", "Cash Drops", "Balances"];
    const [newUser, setNewUser] = useState({
        POS: false, advertising: false, balances: false,
        cashDrops: false, email: "", firstName: "", itemDesigner: false, keyLayout: false,
        lastName: "", membership: false, refunds: false, reports: false, stocktake: false,
        userDesigner: false, password: "", adminLevel: 1, isActive: true, totTime: 0, totalTrans: 0,
        passwordConf: ""
    });

    //upon load get users from database
    useEffect(() => {
        getUsers();
    }, [])

    //get users from database
    function getUsers() {
        API.getUsers().then((res) => {
            setUserList(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    //checks the password change conditions have been met
    function userChange(change) {
        switch (change[0].arrayTitle) {
            case 'password1':
                password1 = change[1];
                break;
            case 'password2':
                password2 = change[1];
                break;
            case 'password3':
                password3 = change[1];
                break;
            default:
                userList[selected][change[0].arrayTitle] = change[1]
                return;

        }
    }

    //checks and updates the password
    function checkPassword() {
        if (password2.length > 0) {
            if (password2 === password3) {
                userList[selected]["password"] = password3;
                API.updateUserPassword(userList[selected]);
                createNotification('success', 'Success', 'Password updated', 3000)
            } else {
                createNotification('error', 'Error', 'Your passwords do not match', 4000)
            }
        } else {
            createNotification('error', 'Error', 'Cannot have blank password', 4000)
        }

    }

    //adds the changed user to the database
    function submitChanges() {
        API.updateUser(userList[selected]).then(() => {
            getUsers();
            createNotification('success', 'Success', 'User updated', 3000)
        }).catch((err) => { console.log(err) });
    }

    //deletes a user from the database
    function deleteUser() {
        if (selected != 0) {
            API.deleteUser(userList[selected].user_id).then(() => {
                setSelect(0);
                getUsers();
                createNotification('success', 'Success', 'User deleted', 3000)
            }).catch((err) => { console.log(err) });
        }
    }

    //creates a new user in the database
    function submitNewUser() {
        if (newUser.password === newUser.passwordConf) {
            console.log(newUser)
            API.addUser(newUser).then(() => {
                getUsers();
                createNotification('success', 'Success', 'New user created', 4000)
            }).catch((err) => { console.log(err) });
        } else {
            console.log(newUser)
            createNotification('error', 'Error', 'Passwords do not match', 4000)
        }

    }

    //interprets input box changes for a new user
    function newUserInput(change) {
        let tempUser = newUser;
        tempUser[change[0].arrayTitle] = change[1]
        setNewUser(tempUser)
    }

    //interprets toggle button changes for a current user.
    function toggleElement(selection, element) {
        let tempList = userList;
        tempList[selection][element] = !tempList[selection][element];
        setUserList(tempList);
        setTestState(!testState)

    }

    //interprets toggle button changes for a new user
    function toggleNewElement(selection, element) {

        let tempUser = newUser;
        tempUser[element] = !tempUser[element];
        setNewUser(tempUser);
        setTestState(!testState)
    }

    return (
        <>
        <TitleBar/>
            <NotificationContainer />
            <div className="row no-gutters">
                <div className="col-md-3 text-center">
                    <Dashboard screen='2'/>
                </div>
                <div className="col-md-9 d-flex justify-content-center  contentContainer fillVertSpace">
                    <div className="container">
                        <div className="row blueHighlight">
                            <div className="modal fade" id="userModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content blueBackground">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Create New User</h5>
                                        </div>
                                        <div className="modal-body">
                                            <Inputbox arrayTitle="userName" changeValue={newUserInput} title="Username" placehold="" />
                                            <Inputbox arrayTitle="firstName" changeValue={newUserInput} title="First Name" placehold="" />
                                            <Inputbox arrayTitle="lastName" changeValue={newUserInput} title="Last Name" placehold="" />
                                            <Inputbox arrayTitle="email" changeValue={newUserInput} title="Email" placehold="" />
                                            <Inputbox type="password" arrayTitle="password" changeValue={newUserInput} title="Password" placehold="" />
                                            <Inputbox type="password" arrayTitle="passwordConf" changeValue={newUserInput} title="Confirm Password" placehold="" />
                                            <h5>Permissions</h5>
                                            {permissions.map((element, index) => {
                                                return <div key={index} className="row whiteBackground blueHighlight mt-1">
                                                    <div className="col-md-4">
                                                        {permissionsText[index]}
                                                    </div>
                                                    <div className="col-md-8 text-right">
                                                        <Togglebutton toggleFunc={toggleNewElement} storedElement={element} storedSelection={-1} storedValue={newUser[element]} />
                                                    </div>
                                                </div>

                                            })}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary redButton" data-dismiss="modal">Cancel</button>
                                            <button type="button" onClick={submitNewUser} className="btn btn-primary greenButton" data-dismiss="modal">Create User</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="passwordModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">New Password</h5>
                                        </div>
                                        <div className="modal-body">
                                            <Inputbox type="password" arrayTitle="password1" changeValue={userChange} title="Current Password" placehold="" />
                                            <Inputbox type="password" arrayTitle="password2" changeValue={userChange} title="New Password" placehold="" />
                                            <Inputbox type="password" arrayTitle="password3" changeValue={userChange} title="Confirm Password" placehold="" />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                            <button type="button" onClick={checkPassword} className="btn btn-primary" data-dismiss="modal">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 whiteBackground borderRightLGrey pt-4">
                                <h5>Users</h5>
                                <ul className="noStyle">
                                    {userList.map((element, index) => {
                                        return <li key={index}>
                                            <button className="blueButton butt75 mtb-2" onClick={function () { setSelect(index) }}>{element.firstName} {element.lastName}</button>
                                        </li>
                                    })}
                                    <li>

                                        <button className="greenButton butt75 mtb-2" data-toggle="modal" data-target="#userModal" >Create User</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-8 whiteBackground pt-4">


                                <ul>

                                    {userList[0] ? <div>
                                        <h5>{userList[0] ? `${userList[selected].firstName} ${userList[selected].lastName}` : ""}</h5>
                                        <Inputbox arrayTitle="username" changeValue={userChange} title="Username" placehold={userList[selected].userName} />
                                        <Inputbox arrayTitle="firstName" changeValue={userChange} title="First Name" placehold={userList[selected].firstName} />
                                        <Inputbox arrayTitle="lastName" changeValue={userChange} title="Last Name" placehold={userList[selected].lastName} />
                                        <Inputbox arrayTitle="email" changeValue={userChange} title="Email" placehold={userList[selected].email} />
                                        <button className="greenButton  butt50" data-toggle="modal" data-target="#passwordModal" >Change Password</button>
                                        <div className="dropdown-divider"></div>
                                        <h5 className='mb-5'>Permissions</h5>
                                        {(state.user_id - 1) != selected &&
                                            permissions.map((element, index) => {
                                                return <div key={index} className="row mb-2 blueHighlight">
                                                    <div className="col-md-4">
                                                        {permissionsText[index]}
                                                    </div>
                                                    <div className="col-md-8 text-right">
                                                        <Togglebutton toggleFunc={toggleElement} storedElement={element} storedSelection={selected} storedValue={userList[selected][element]} />
                                                    </div>
                                                </div>

                                            })}
                                        {(state.user_id - 1) === selected &&
                                            <h5>You cannot edit your own permissions.</h5>
                                        }
                                    </div> : "Please select a user"}
                                </ul>


                            </div>
                        </div>
                        {userList[0] ?

                            <div className="row mt-1">
                                <div className="col-md-6">
                                    <button className="greenButtonLight butt50" onClick={submitChanges}>Save Changes</button>
                                </div>
                                <div className="col-md-6">
                                    <button className="redButton butt50" onClick={deleteUser}>Delete User</button>
                                </div>
                            </div>
                            : <> </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
