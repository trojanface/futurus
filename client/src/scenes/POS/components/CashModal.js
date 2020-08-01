import React, { useState, useEffect } from 'react'

export default function CashModal(props) {
    const cashValues = [100, 50, 20, 10, 5, 2, 1, .50, .20, .10, .05]
    const cashPaths = [`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQW85NSAbgjSeSmBI4JSxL2u-Hz9ZMy_LRZuZwPpM46xg&usqp=CAU&ec=45687375`,
        `https://banknotes.rba.gov.au/banknote-features/images/new-fifty/new-fifty-banknote-flipped.jpg`,
        `https://lh3.googleusercontent.com/proxy/FrKPHtGoHhlF_TdmX44sjsYk6qZkh3yYD3WWRtciHAEsWEGhOaS3NMRBhj9bGlFUBmLAXZbrpzz7fkmblrWwiqJp5lwXmViJZgpg41dPgdgfBL4czL7rrWOrR6czx69Z56fAoVMQnHmP`,
        `https://banknotes.rba.gov.au/banknote-features/images/new-ten/new-ten-banknote.jpg`,
        `https://banknotes.rba.gov.au/assets/images/australias-banknotes/banknotes-in-circulation/five-dollar-note-ngb.jpg`,
        `https://www.ramint.gov.au/sites/default/files/2019/Corporate_Website/Misc/large_australia_standard_rev_2_albr_circ_hh.jpg`,
        `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpl9lyU7Ur2LoMAVXvFrDeUJ0ScpoJUCqQxN8nUCr2crguezM8BscYRtyJ4WuNQyBCnhALdgUp&usqp=CAc`,
        `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3yFDFiiAF-HstSWfOMCn1Dc5uClWqPWdsgQ&usqp=CAU`,
        `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSeldtPMMKKeXyC8_d5mnuwy8kyk42E4SQqgg&usqp=CAU`,
        `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsw4j1ctOC_FEbF1zuu-Z22rNCE-LzVfcyyjIWPYTP9Fza7aaNRytxzMJUoNveTGuaP6ab6nTJ&usqp=CAc`,
        `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlhrrPbtV4_71TPZ2-41OFkz4Yui3YM8J7xS9Tb5w16cc59h5ROowRWDEG9g&usqp=CAc`
    ];
    const [paid, setPaid] = useState(0);
    const [fullyPaid, setFullyPaid] = useState(false);
    const [displayVar, setDisplay] = useState(``)
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
                        <div className="row no-gutters whiteBackground blueHighlight pl-2">
                            TOTAL: ${props.toPay.toFixed(2)}
                        </div>
                        <div className="row no-gutters whiteBackground blueHighlight pl-2">
                            Paid: ${paid}
                        </div>
                        <div className="row no-gutters whiteBackground blueHighlight pl-2">
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
