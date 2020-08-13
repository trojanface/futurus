import React, { useState, useEffect } from 'react'

export default function EftModal(props) {
    const [state, setstate] = useState('')

    return (
        <div>
            <div className="modal-dialog" role="document">
                <div className="modal-content blueBackground">
                    <div className="modal-body">
                        <h5>Please tap/swipe/insert your card</h5>
                        <div className="row no-gutters">
                            {state}
                        </div>
                        <div className="row no-gutters  whiteBackground ">
                            <div className="col-md-12 pl-2">
                                TOTAL: ${props.toPay.toFixed(2)}
                            </div>
                        </div>


                    </div>
                    <div className="modal-footer">

                        {state === '' &&
                            <>
                                {props.closeModal ?
                                    <>
                                        <button className="redButton butt50" onClick={props.closeModal}>Back</button>

                                    </>
                                    :
                                    <>
                                        <button className="redButton butt50" data-dismiss="modal">Back</button>
                                    </>
                                }
                                {props.toPay ?
                                    <button className="greenButton butt50" onClick={() => { setstate('Processing...'); setTimeout(() => { setstate('Approved') }, 3000); }}>Trigger Payment (DEMO)</button>
                                    : <></>}
                            </>
                        }
                        {state === 'Approved' &&
                            <>
                                {props.closeModal ?
                                    <>
                                        <button className="greenButton butt50" onClick={() => { props.subTrans(); setstate('') }}>OK</button>

                                    </>
                                    :
                                    <>
                                        <button className="greenButton butt50" onClick={() => { props.subTrans(); setstate('') }} data-dismiss="modal">OK</button>
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
