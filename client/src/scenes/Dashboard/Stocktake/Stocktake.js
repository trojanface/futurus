import React, { useState, useEffect } from 'react'
import Inputbox from '../../../components/CheckBox/Inputbox'
import API from '../../../utils/API'
import Dashboard from '../Dashboard'
import { NotificationContainer } from 'react-notifications'
import createNotification from '../../../components/CheckBox/Notification'

export default function Stocktake() {
    const [allItems, setAllItems] = useState([])
    const [stockReceive, setstockReceive] = useState([])
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

    function submitStock() {
        allItems.forEach((el, index) => {
            allItems[index].cost = allItems[index].cost / 100;
            allItems[index].price = allItems[index].price / 100;
            API.updateItem(allItems[index]);
        });
        getAllItems();
        let inputs = document.getElementsByClassName("inpBox");
       for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";//TODO must reset all inputs so you don't double up on entries
        };

        createNotification('success', 'Success', 'Stock updated', 3000);

    }

    function recStock(event, index) {
        let newAmount = parseInt(event.target.value);
        if (typeof newAmount === "number") {
            let copyStock = stockReceive;
            copyStock[index].stockCount = copyStock[index].stockCount + newAmount;
            setstockReceive(copyStock)
        } else {
            console.log("NAN")
        }
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
                                    Receive Stock:<input className="inpBox" type="number" onChange={(event) => recStock(event, index)}></input>
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