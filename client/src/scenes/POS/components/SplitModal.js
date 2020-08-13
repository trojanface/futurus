import React, { useState, useEffect } from 'react'
import CashModal from './CashModal';
import EftModal from './EftModal';
import createNotification from '../../../components/CheckBox/Notification';



export default function SplitModal(props) {
    //initialise states
    const [splitpay, setSplitPay] = useState(0.00);
    const [screen, setscreen] = useState(0)
    const [amtPaid, setAmtPaid] = useState(0)

    //return to split menu and update the amounts paid and to pay
    function submitTrans() {
        setscreen(0)
        setAmtPaid(amtPaid + splitpay);
        setSplitPay((props.toPay - (amtPaid + splitpay)))

    }

    function handleChange(event) {
        setSplitPay((parseFloat(event.target.value)))
    }

    function changeScreen() {
        setscreen(0)
    }

    return (
        <div>
            {screen === 1 &&
                <CashModal subTrans={submitTrans} toPay={splitpay} closeModal={changeScreen} />
            }
            {screen === 2 &&
                <EftModal subTrans={submitTrans} toPay={splitpay} closeModal={changeScreen} />
            }
            {screen === 0 &&
                <div className="modal-dialog" role="document">
                    <div className="modal-content blueBackground">
                        <div className="modal-body">
                            <h5>Split Payment</h5>
                            <div className="row no-gutters">
                                <input type="number" step="0.05" onChange={handleChange} value={splitpay}></input>
                            </div>
                            <div className="row no-gutters mb-3">
                                {splitpay ?
                                    <>
                                        {splitpay <= (props.toPay - amtPaid) &&
                                            <>
                                                <button className="greenButton butt25 mr-3 mt-2" onClick={() => { setscreen(1) }} >Cash</button>
                                                <button className="greenButton butt25 mt-2" onClick={() => { setscreen(2) }}>Eft</button>
                                            </>
                                        }
                                        {splitpay > (props.toPay - amtPaid) &&
                                            <>
                                                <button className="greenButton butt25 mr-3 mt-2" onClick={() => { createNotification('error', 'Error', 'Amount must be leas than total amount remaining', 3000) }}>Cash</button>
                                                <button className="greenButton butt25 mt-2" onClick={() => { createNotification('error', 'Error', 'Amount must be leas than total amount remaining', 3000) }}>Eft</button>
                                            </>
                                        }
                                    </>
                                    :
                                    <>
                                        <button className="greenButton butt25 mr-3 mt-2" onClick={() => { createNotification('error', 'Error', 'Amount must be greater than 0', 3000) }}>Cash</button>
                                        <button className="greenButton butt25 mt-2" onClick={() => { createNotification('error', 'Error', 'Amount must be greater than 0', 3000) }}>Eft</button>
                                    </>
                                }

                            </div>
                            <div className="row no-gutters whiteBackground ">
                                <div className="col-md-12 pl-2">
                                    TOTAL remaining: ${(props.toPay - amtPaid).toFixed(2)}
                                </div>
                            </div>


                        </div>
                        <div className="modal-footer">
                            {amtPaid == 0 &&
                                <button className="redButton butt50" onClick={() => { setSplitPay(0) }} data-dismiss="modal">Back</button>
                            }
                            {props.toPay > 0 &&
                                amtPaid >= props.toPay &&
                                <button onClick={() => {
                                    setAmtPaid(0)
                                    setSplitPay(0)
                                    props.subTrans();
                                }} className="greenButton butt50" data-dismiss="modal">Finalise Transaction</button>

                            }
                        </div>
                    </div>
                </div>
            }









        </div>
    )
}
