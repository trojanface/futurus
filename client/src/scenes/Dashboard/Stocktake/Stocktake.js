import React, { useState, useEffect } from 'react'
import Inputbox from '../../../components/CheckBox/Inputbox'
import API from '../../../utils/API'
import Dashboard from '../Dashboard'
import { NotificationContainer } from 'react-notifications'
import createNotification from '../../../components/CheckBox/Notification'

export default function Stocktake() {
    const [allItems, setAllItems] = useState([])
    const [stockReceive, setstockReceive] = useState([])
    const [oldItems, setOldItems] = useState([])
    useEffect(() => {
        getAllItems();
    }, [])

    function getAllItems() {
        API.getAllItems().then((res) => {
            setAllItems(res.data);
            setstockReceive(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

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
        // allItems.forEach(async function (el, index) {

        //     await API.updateItem(allItems[index]);
        // });
        getAllItems();


        createNotification('success', 'Success', 'Stock updated', 3000);

    }

 

    return (

        <div className="row no-gutters">
            <NotificationContainer />
            <div className="col-md-3 text-center">
                <Dashboard />
            </div>
            <div className="col-md-9 d-flex justify-content-center">
                <div className="container blueBackground">
                    {allItems[0] ? <div className="row pt-12">
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
    )
}
//TODO Add a save changes button and a delete item button and a delete department button