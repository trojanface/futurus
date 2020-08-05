import React, { useState } from 'react'
import Moment from 'moment'

export default function ReportBody({ setRepList, resArray, createItemList, userList }) {
    const [state, setstate] = useState(false)

    function sortArray(array, sortBy, order) {
        let newArray = array.sort(function (a, b) {
            var keyA = a[sortBy],
                keyB = b[sortBy];
            if (order === 'asc') {
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
            } else {
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
            }
            return 0;
        })
        return newArray;

    }
    return (
        <div>
            <div className="row">
                <div onClick={() => {
                    if (state === true) {
                        setRepList(sortArray(resArray, 'trans_id', 'asc'));
                    } else {
                        setRepList(sortArray(resArray, 'trans_id', 'desc'));
                    }
                    setstate(!state);
                }} className="col-md-1">Trans. Id</div>
                <div className="col-md-2">User</div>
                <div className="col-md-4">Items Sold</div>
                <div onClick={() => {
                    if (state === true) {
                        setRepList(sortArray(resArray, 'transValue', 'asc'));
                    } else {
                        setRepList(sortArray(resArray, 'transValue', 'desc'));
                    }
                    setstate(!state);
                }} className="col-md-1">Trans. Value</div>
                <div onClick={() => {
                    if (state === true) {
                        setRepList(sortArray(resArray, 'createdAt', 'asc'));
                    } else {
                        setRepList(sortArray(resArray, 'createdAt', 'desc'));
                    }
                    setstate(!state);
                }} className="col-md-4">Date/Time</div>
            </div>
            {resArray.map((element, index) => {
                return <div className="row blueHighlight" key={index}>
                    <div className="col-md-1">{element.trans_id}</div>
                    <div className="col-md-2">{userList[element.user - 1].userName}</div>
                    <div className="col-md-4"><ul>{createItemList(element.transItems)}</ul></div>
                    <div className="col-md-1">${(element.transValue / 100)}</div>
                    <div className="col-md-4">{Moment(element.createdAt).format('DD MMMM YYYY hh:mm')}</div>
                </div>
            })}
        </div>
    )
}
