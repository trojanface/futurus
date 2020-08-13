import React, { useState, useEffect } from 'react'
import note100 from './assets/100.png';
import note50 from './assets/50.png';
import note20 from './assets/20.png';
import note10 from './assets/10.png';
import note5 from './assets/5.png';
import coin2 from './assets/2.png';
import coin1 from './assets/1.png';
import coin50 from './assets/50c.png';
import coin20 from './assets/20c.png';
import coin10 from './assets/10c.png';
import coin05 from './assets/5c.png';

export default function CashModal(props) {
    //declare the coin images in an array and their values
    const cashValues = [100, 50, 20, 10, 5, 2, 1, .50, .20, .10, .05]
    const cashPaths = [note100,
        note50,
        note20,
        note10,
        note5,
        coin2,
        coin1,
        coin50,
        coin20,
        coin10,
        coin05
    ];

    //initialise states
    const [paid, setPaid] = useState(0);
    const [fullyPaid, setFullyPaid] = useState(false);
    const [displayVar, setDisplay] = useState(``)

    //update the amount left to pay and the change.
    useEffect(() => {
        if (paid != 0) {
            if (paid < props.toPay) {
                setDisplay(`To Pay: $${(props.toPay - paid).toFixed(2)}`)
                setFullyPaid(false);
            } else {
                setDisplay(`Change: $${(paid - props.toPay).toFixed(2)}`)
                setFullyPaid(true);
            }
        }
    }, [, paid, props.toPay])

    //set the amount left to pay
    function calculate(payVal) {
        setPaid(paid + payVal);
    }
    return (
        <div>
            <div className="modal-dialog" role="document">
                <div className="modal-content blueBackground">
                    <div className="modal-body">
                        {cashValues.map((element, index) => {
                            return <>
                                {index <= 4 &&
                                    <div key={index} className="row no-gutters">
                                        <div className="col-md-12">
                                            <button style={{ minWidth: '20vh', minHeight: '10vh', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${cashPaths[index]})` }} onClick={() => calculate(element)}></button>
                                        </div>
                                    </div>
                                }
                                {index > 4 &&
                                    <button key={index} style={{ minWidth: '10vh', minHeight: '10vh', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${cashPaths[index]})` }} onClick={() => calculate(element)}></button>
                                }
                            </>
                        })}
                        <div className="row no-gutters whiteBackground pt-1 pl-2">
                            TOTAL: ${props.toPay.toFixed(2)}
                        </div>
                        <div className="row no-gutters whiteBackground pt-1 pl-2">
                            Paid: ${paid}
                        </div>
                        <div className="row no-gutters whiteBackground pt-1 pl-2">
                            {displayVar ? displayVar : `To Pay: $${props.toPay.toFixed(2)}`}
                        </div>


                    </div>
                    <div className="modal-footer">
                        {props.closeModal ?
                            <>
                                <button onClick={() => {
                                    setPaid(0);
                                    setFullyPaid(false);
                                    setDisplay('');
                                }} type="button" className="btn btn-secondary redButton butt50" onClick={props.closeModal}>Back</button>
                                {fullyPaid ? <button onClick={() => {
                                    props.subTrans();
                                    setPaid(0);
                                    setFullyPaid(false);
                                    setDisplay('');
                                }} type="button" className="btn btn-primary greenButton butt50">Cash Transaction</button> : <> </>}
                            </>
                            :
                            <>
                                <button onClick={() => {
                                    setPaid(0);
                                    setFullyPaid(false);
                                    setDisplay('');
                                }} type="button" className="btn btn-secondary redButton butt50" data-dismiss="modal">Back</button>
                                {fullyPaid ? <button onClick={() => {
                                    props.subTrans();
                                    setPaid(0);
                                    setFullyPaid(false);
                                    setDisplay('');
                                }} type="button" data-dismiss="modal" className="btn btn-primary greenButton butt50">Cash Transaction</button> : <> </>}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
