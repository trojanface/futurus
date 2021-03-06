import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import Dashboard from '../Dashboard/Dashboard'
import { NotificationContainer } from 'react-notifications'
import createNotification from '../../components/CheckBox/Notification'
import Inputbox from '../../components/CheckBox/Inputbox'
import Moment from 'moment'
import ReportBody from './Components/ReportBody'
import TitleBar from '../Dashboard/TitleBar'

export default function Reports() {
    const [time, setTime] = useState({ startDate: '', endDate: '', startTime: '', endTime: '' })
    const [repList, setRepList] = useState([])
    const [reportContent, setReportContent] = useState('')
    const [departments, setDept] = useState([])
    const [userList, setUserList] = useState([])
    const [allItems, setAllItems] = useState([])
    const [selRep, setSelRep] = useState(0)

    useEffect(() => {
        getUsers();
        getDepartments();
        getAllItems();
    }, [])

    function getUsers() {
        API.getUsers().then((res) => {
            setUserList(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    function getDepartments() {
        API.getDepts().then((res) => {
            setDept(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    function getAllItems() {
        API.getAllItems().then((res) => {
            console.log(res.data)
            setAllItems(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    function newTimeInput(change) {
        let tempTime = time;
        tempTime[change[0].arrayTitle] = change[1]
        setTime(tempTime)
        console.log(tempTime)
    }

    function createItemList(itemString) {
        let tempArray = itemString.split(",")
        return tempArray.map((element, index) => {
            return <li key={`subList-${index}`}>{allItems[element - 1].name}</li>
        })
    }

    useEffect(() => {
        console.log(repList)
    }, [repList])

    function reportQuery() {
        let starttime = `${time.startDate} ${time.startTime}`
        let endtime = `${time.endDate} ${time.endTime}`
        if (selRep === 0) {
            API.getTransactions({ startDate: starttime, endDate: endtime }).then((res) => {
                setRepList(res.data);
            }).catch((err) => {
                console.log(err)
            })
        }
    }




    return (
        <div>
            <TitleBar />
        
        <div className="row no-gutters">
            <NotificationContainer />
            <div className="col-md-3 text-center">
                <Dashboard screen='7' />
            </div>
            <div className="col-md-9 d-flex justify-content-center  contentContainer fillVertSpace">
                <div className="container">
                    <div className="row blueHighlight ">
                        <div className="col-md-4 whiteBackground  borderRightLGrey pt-4">
                            <h5>Reports</h5>
                            <ul className="noStyle">
                                <li>
                                    <button className="blueButton butt75 mtb-2" onClick={() => { setSelRep(0) }} data-toggle="modal" data-target="#userModal" >Transactions</button>
                                </li>

                                <li>
                                    <button className="blueButton butt75 mtb-2" data-toggle="modal" data-target="#userModal" >Products</button>
                                </li>
                                <li>
                                    <button className="blueButton butt75 mtb-2" data-toggle="modal" data-target="#userModal" >Departments</button>
                                </li>
                                <li>
                                    <button className="blueButton butt75 mtb-2" data-toggle="modal" data-target="#userModal" >Users</button>
                                </li>
                                <li>
                                    <button className="blueButton butt75 mtb-2" data-toggle="modal" data-target="#userModal" >Daily</button>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-8 whiteBackground  pt-4">
                            {selRep === 0 &&
                                <h5>Transaction Report</h5>}
                            <Inputbox type='date' arrayTitle="startDate" changeValue={newTimeInput} title="Start Date" placehold="dd/mm/yyyy" />
                            <Inputbox type='date' arrayTitle="endDate" changeValue={newTimeInput} title="End Date" placehold="dd/mm/yyyy" />
                            <Inputbox type='time' arrayTitle="startTime" changeValue={newTimeInput} title="Start Time" placehold="hh:mm" />
                            <Inputbox type='time' arrayTitle="endTime" changeValue={newTimeInput} title="End Time" placehold="hh:mm" />
                            <div className="pt-3 pb-3">
                            <button className="greenButton" onClick={() => { reportQuery() }}>Fetch Report</button>
                            </div>
                            <div className="dropdown-divider"></div>
                            {repList.length !== 0 &&
                            <ReportBody resArray={repList} setRepList={setRepList} createItemList={createItemList} userList={userList}/>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    )
}
