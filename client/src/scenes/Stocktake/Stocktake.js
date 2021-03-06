import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import Dashboard from '../Dashboard/Dashboard'
import { NotificationContainer } from 'react-notifications'
import createNotification from '../../components/CheckBox/Notification'
import TitleBar from '../Dashboard/TitleBar'

export default function Stocktake() {
    //initialise state and variables
    const [allItems, setAllItems] = useState([])
    const [stockReceive, setstockReceive] = useState([])
    const [oldItems, setOldItems] = useState([])

    //get all items from database upon load
    useEffect(() => {
        getAllItems();
    }, [])

    //retrieves all items from the database
    function getAllItems() {
        API.getAllItems().then((res) => {
            setAllItems(res.data);
            setstockReceive(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    //loops through each item and checks if it has been changed, if it has then it will send the update to the database
    async function submitStock() {
        let tempItems = allItems;
        let inputs = document.getElementsByClassName("inpBox");
        for (let i = 0; i < inputs.length; i++) {
            let newAmount = parseInt(inputs[i].value);
            tempItems[i].stockCount += newAmount;
            inputs[i].value = "";
        };
        for (const item of tempItems) {
            if (item.stockCount >= 0) {
                console.log(item);
                item.cost = item.cost / 100;
                item.price = item.price / 100;
                await API.updateItem(item);
            }
        }
        getAllItems();
        createNotification('success', 'Success', 'Stock updated', 3000);
    }



    return (
        <div>
            <TitleBar />
      
        <div className="row no-gutters">
            <NotificationContainer />
            <div className="col-md-3 text-center">
                <Dashboard screen='6'/>
            </div>
            <div className="col-md-9 d-flex justify-content-center  contentContainer fillVertSpace">
                <div className="container whiteBackground">
                    {allItems[0] ? <div className="row pt-4">
                        <div className="col-md-12">
                            <h3>Stock</h3>
                        </div>
                    </div> : <></>}
                    {allItems[0] ?
                        allItems.map((element, index) => {
                            return <div key={index} className="row whiteBackground blueHighlight mtb-2 pb-3">
                                <div className="col-md-2">
                                    {element.name}
                                </div>
                                <div className="col-md-3">
                                    Receive Stock:<input className="inpBox" type="number"></input>
                                </div>
                                <div className="col-md-3">
                                    Inventory Count: {element.stockCount}
                                </div>
                            </div>
                        })
                        : <></>}
                    <div className="row">
                        <div className="col-md-6">
                            <button className="greenButton butt50 mtb-2" onClick={submitStock}>Save Changes</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
