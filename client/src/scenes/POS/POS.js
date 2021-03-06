import React, { useState, useEffect, useContext } from 'react'
import './style.css'
import API from '../../utils/API'
import CashModal from './components/CashModal'
import EftModal from './components/EftModal'
import SplitModal from './components/SplitModal'
import { store } from '../../GlobalStore'
import ReactTimer from "@xendora/react-timer";
import { NotificationContainer } from 'react-notifications'
import createNotification from '../../components/CheckBox/Notification'
import { Redirect } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function POS() {
  //declaration of state and variables
  const { state, setState } = useContext(store);
  const [departments, setDept] = useState([])
  const [deptButtWidth, setDeptButtWidth] = useState(`col-12`)
  const [items, setItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [transaction, setTransaction] = useState([])
  const [total, setTotal] = useState(0)
  const [countVal, setCountVal] = useState(false)
  const [screen, setScreen] = useState(0)
  const [SPC, setSPC] = useState(0)
  const [transNum, setTransNum] = useState(0)
  const [searchVal, setSearchVal] = useState('')
  const [highlightObj, setHighlightObj] = useState({ dep: -1, item: -1 })
  const { transcript, listening, finalTranscript, resetTranscript } = useSpeechRecognition()
  const [temperature, setTemperature] = useState(0)
  const [upsellArray, setUpsellArray] = useState([])
  let colorArray = ['rgb(255, 110, 110)', 'rgb(255, 228, 110)', 'rgb(255, 110, 255)', 'rgb(110, 255, 187)', 'rgb(149, 110, 255)', 'rgb(255, 110, 190)',
    'rgb(110, 214, 255)', 'rgb(139, 255, 110)', 'rgb(110, 168, 255)', 'rgb(112, 110, 255)', 'rgb(255, 180, 110)'];
  //upon load retrieve all departments and set the width of the department columns
  //then get all items and all items that match with the current department
  //if the global state cannot be accessed then log the user out.
  useEffect(() => {
    API.getDepts().then((res) => {
      setDept(res.data);
      if (res.data.length > 6) {
        setDeptButtWidth('col-2');
      } else {
        setDeptButtWidth(`col-${Math.round(12 / res.data.length)}`)
      }
      console.log(res.data)

      getAllItems();
      return res;
    }).then((res) => {
      getItems(res.data[0].dept_id);
    }).then(() => {
      if (state === 0) {
        API.logOut();
        setScreen(10);
      }
    }).catch((err) => {
      console.log(err);
    })

  }, [])

  //if the voice recognition model has finished recieving information then trigger search function
  useEffect(() => {
    if (finalTranscript != '' && listening === false) {
      searchForItem();
    }
  }, [listening])

  //search the database for products that fit into the correct weather profile for the current temperature
  function findUpsells(temp) {
    if (allItems.length != 0) {
      if (upsellArray.length != 0) {
        setUpsellArray([])
      }
      if (temp <= 20) {
        allItems.forEach((element) => {
          if (element.upsell === "cold" && element.stockCount > 5) {
            let tempArray = upsellArray;
            if (tempArray.length != 0) {
              if (tempArray[tempArray.length - 1].prod_id != element.prod_id) {
                tempArray.push(element);
                setUpsellArray(tempArray);
              }
            } else {
              tempArray.push(element);
              setUpsellArray(tempArray);
            }

          }
        })
      }
      if (temp > 20) {
        allItems.forEach((element) => {
          if (element.upsell === "hot" && element.stockCount > 5) {
            let tempArray = upsellArray;
            if (tempArray.length != 0) {
              if (tempArray[tempArray.length - 1].prod_id != element.prod_id) {
                tempArray.push(element);
                setUpsellArray(tempArray);
              }
            } else {
              tempArray.push(element);
              setUpsellArray(tempArray);
            }
          }
        })
      }
      let tempArray = upsellArray;
      setUpsellArray(shuffle(tempArray).slice(0, 1))
      console.log(upsellArray)
    }
  }

  //shuffle an array
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  //empty the transaction array and reset
  function resetTrans() {
    getAllItems();
    setHighlightObj({ dep: -1, item: -1 })
    clearTimeout();
    setCountVal(false);
    setTransaction([]);
    setTotal(0)
  }

  //send the transaction to the database.
  function submitTrans() {
    if (transaction.length != 0) {
      let newState = state;
      newState.totTime = (newState.totTime + (parseInt(document.getElementById('timerEl').innerHTML)));
      newState.totalTrans += 1;
      setState(newState);
      setTransNum(transNum + 1);
      setSPC(SPC + total);
      const transObj = { user: state.user_id, transItems: transaction.toString(), transValue: total * 100 };
      console.log(state.totTime + "/" + state.totalTrans + "=" + (state.totTime / state.totalTrans))
      API.addTrans(transObj).then(() => {
        let tempArray = allItems;
        transaction.forEach((element, index) => {
          console.log(tempArray[element - 1].cost)
          tempArray[element - 1].cost = tempArray[element - 1].cost / 100;
          tempArray[element - 1].price = tempArray[element - 1].price / 100;
          tempArray[element - 1].stockCount = tempArray[element - 1].stockCount - 1;
          API.updateItem(tempArray[element - 1])
          resetTrans();
        })
      }).catch((err) => console.log(err));


    }
  }

  //retrieve all the items in the database
  function getAllItems() {
    if (allItems.length === 0) {
      API.getWeather().then((res) => {
        setTemperature((res.data.main.feels_like - 273));
        findUpsells(Math.round(res.data.main.feels_like - 273));
      }).catch((err) => {
        console.log(err)
      })
    }
    API.getAllItems().then((res) => {
      console.log(res.data)
      setAllItems(res.data);
    }).catch((err) => {
      console.log(err);
    })

  }

  //retrieve all the items in the database in the supplied department
  function getItems(depId) {
    if (allItems.length > 0) {
      let tempArray = [];
      allItems.forEach((element) => {
        if (element.department === depId) {
          tempArray.push(element);
        }
      });
      setItems(tempArray);
    } else {
      API.getItems(depId - 1).then((res) => {
        setItems(res.data);
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  //add the selected product to the transaction array
  function addToTransaction(additem) {
    findUpsells(temperature)
    console.log(additem)
    setHighlightObj({ dep: -1, item: -1 })
    setCountVal(true)
    setTransaction([...transaction, additem])
    setTotal(total + allItems[additem - 1].price / 100);

  }

  //interpret changes in the search field
  function handleSearch(event) {
    setSearchVal(event.target.value)
  }

  //search for an item based upon name
  function searchForItem(event) {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      event.preventDefault();
      console.log('no speech recognition')
      API.findItem(searchVal).then((res) => {
        console.log(res.data)
        setHighlightObj({ dep: res.data[0].department, item: res.data[0].prod_id })
        setSearchVal("");
      });
    } else {
      API.findItem(transcript).then((res) => {
        console.log(res.data)
        if (res.data[0] != null) {
          setHighlightObj({ dep: res.data[0].department, item: res.data[0].prod_id })
        } else {
          createNotification('error', 'Error', 'Could not find item', 3000)
        }
        resetTranscript();
      });
    }


  }

  //if the user has selected a different screen navigate to it
  switch (screen) {
    case 1:
      return <Redirect to='/pos' />

    case 2:
      return <Redirect to='/userdesigner' />

    case 3:
      return <Redirect to='/itemdesigner' />

    case 4:
      return <Redirect to='/pos' />

    case 5:
      return <Redirect to='/pos' />

    case 6:
      return <Redirect to='/stocktake' />

    case 7:
      return <Redirect to='/reports' />

    case 8:
      return <Redirect to='/pos' />

    case 9:
      return <Redirect to='/pos' />
    case 10:
      setState(0);
      return <Redirect to='/logout' />
    default:
      break;
  }

  return (
    <div>
      <NotificationContainer />
      <div className="modal fade" id="cashModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <CashModal subTrans={submitTrans} toPay={total} />

      </div>
      <div className="modal fade" id="eftModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <EftModal subTrans={submitTrans} toPay={total} />

      </div>
      <div className="modal fade" id="splitModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <SplitModal subTrans={submitTrans} toPay={total} />

      </div>

      <nav className="navbar navbar-expand-lg navbar-light altColor blueHighlight">
        <button className="mr-auto greenButtonLight butt10 " id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
          </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {state.userDesigner ?
            <a onClick={() => { setScreen(2) }} className="dropdown-item dropDownMenuHighlight" >User Designer</a>
            : <></>}
          {state.itemDesigner ?
            <a onClick={() => { setScreen(3) }} className="dropdown-item dropDownMenuHighlight">Item Designer</a>
            : <></>}
          {state.keyLayout ?
            <a onClick={() => { setScreen(4) }} className="dropdown-item dropDownMenuHighlight" >POS Layout Editor</a>
            : <></>}
          {state.balances ?
            <a onClick={() => { setScreen(5) }} className="dropdown-item dropDownMenuHighlight">User Balance</a>
            : <></>}
          {state.stocktake ?
            <a onClick={() => { setScreen(6) }} className="dropdown-item dropDownMenuHighlight" >Stocktake</a>
            : <></>}
          {state.reports ?
            <a onClick={() => { setScreen(7) }} className="dropdown-item dropDownMenuHighlight">Reports</a>
            : <></>}
          {state.membership ?
            <a onClick={() => { setScreen(8) }} className="dropdown-item dropDownMenuHighlight" >Membership</a>
            : <></>}
          {state.advertising ?
            <a onClick={() => { setScreen(9) }} className="dropdown-item dropDownMenuHighlight">Advertising</a>
            : <></>}
        </div>
        <button onClick={() => { API.logOut(); setScreen(10) }} className="my-2 my-sm-0 redButton butt10" type="submit">Sign Out</button>
      </nav>
      <div className="row no-gutters contentContainer fillVertSpace">
        <div className="col-md-3 whiteBackground">
          {window.innerWidth > 768 &&
          <>
          <div className="row no-gutters">
            <div className="col-md-12 leftMenuHeight">
              <h3 className="pl-3">Upsell Window</h3>
              {temperature ?
                <div className="pl-3">
                  <h4>
                    Current Temperature: {temperature.toFixed(0)} degrees
                  </h4>
                </div>
                :
                <></>
              }
              {upsellArray[0] ?
                <>
                  {upsellArray.map((element, index) => {
                    return <div key={index} className="col-md-12 centerText">
                      {highlightObj.item === upsellArray[index].prod_id &&
                        <>
                          <button className="roundButton whiteButton attention" style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${element.iconPath})` }} onClick={() => { addToTransaction(element.prod_id) }}></button>
                          <label className="d-block">{element.name}</label>
                        </>
                      }
                      {highlightObj.item !== upsellArray[index].prod_id &&
                        <>
                          <button className="roundButton whiteButton " style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${element.iconPath})` }} onClick={() => { addToTransaction(element.prod_id) }}></button>
                          <label className="d-block">{element.name}</label>
                        </>
                      }
                    </div>
                  })}
                </>
                :
                <div className="pl-3"><h5>No Upsells Available</h5></div>}
            </div>
          </div>
          <div className="dropdown-divider"></div>
          <div className="row no-gutters">
            <div className="col-md-12 leftMenuHeight">
              <h3 className="pl-3">KPI</h3>
              <h4 className="pl-3">Transaction Time -
                {countVal ?
                  <ReactTimer
                    interval={1000}
                    start={0}
                    end={t => false}
                    onTick={t => t + 1}
                  >
                    {time => <span id="timerEl">{time}</span>}
                  </ReactTimer>
                  : <>0</>
                } secs
                </h4>
              <h4 className="pl-3">Avg Transaction Time - {state.totalTrans ?
                state.totTime ?
                  state.totTime / state.totalTrans
                  :
                  0
                :
                0
              } secs</h4>
              <h4 className="pl-3">SPC - {(SPC / transNum)}</h4>
            </div>
          </div>
          </>
}
        </div>

        <div className="col-md-6">
          <div className="row no-gutters">
            {departments[0] ?
              <> {departments.map((element, index) => {
                return <div key={index} className={deptButtWidth}>
                  {highlightObj.dep === (index + 1) &&
                    <div className="centerText">
                      <button className="roundButton whiteButton mt-3 attention" style={{ backgroundColor: colorArray[index] }} onClick={() => { getItems(departments[index].dept_id) }}>{element.name}</button>
                      {/* <label className="d-block">{element.name}</label> */}
                    </div>
                  }
                  {highlightObj.dep !== (index + 1) &&
                    <div className="centerText">
                      <button className="roundButton whiteButton mt-3" style={{ backgroundImage: `url(${element.iconPath})`, backgroundColor: colorArray[index] }} onClick={() => { getItems(departments[index].dept_id) }}>{element.name}</button>
                      {/* <label className="d-block">{element.name}</label> */}
                    </div>
                  }
                </div>
              })}</>
              :
              <></>
            }

          </div>
          <div className="row no-gutters">
            <div className="col-md-12">
              <form className="form-inline my-2 my-lg-0 p-3 py-4">
                {SpeechRecognition.browserSupportsSpeechRecognition() ?
                  <>
                    {transcript ?
                      <button className="voiceSearch butt100 py-3" onClick={(event) => { event.preventDefault(); SpeechRecognition.startListening(); }} type="search">{transcript}</button>

                      :
                      <button className="voiceSearch butt100 py-3" onClick={(event) => { event.preventDefault(); SpeechRecognition.startListening(); }} type="search">Click to voice search</button>

                    }

                  </>
                  :
                  <>
                    <input className="voiceSearch butt75 py-3 pl-2" value={searchVal} onChange={handleSearch} type="search" placeholder="Search" aria-label="Search" />
                    <button className="greenButton butt25" onClick={(event) => { searchForItem(event) }}>Search</button>
                  </>
                }
              </form>
            </div>
          </div>
          <div className="row no-gutters">
            {items[0] ?
              <>
                {items.map((element, index) => {
                  return <div key={index} className="col-2 centerText">
                    {highlightObj.item === items[index].prod_id &&
                      <>
                        <button className="roundButton whiteButton attention" style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${element.iconPath})` }} onClick={() => { if (items[index].stockCount > 0) { addToTransaction(items[index].prod_id) } else { createNotification('error', 'Error', 'Item out of stock', 3000) } }}></button>
                        <label className="d-block labelText">{element.name}</label>
                      </>
                    }
                    {highlightObj.item !== items[index].prod_id &&
                      <>
                        {element.stockCount >= 10 &&
                          <>
                            <button className="roundButton whiteButton " style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${element.iconPath})` }} onClick={() => { if (items[index].stockCount > 0) { addToTransaction(items[index].prod_id) } else { createNotification('error', 'Error', 'Item out of stock', 3000) } }}></button>
                            <label className="d-block labelText">{element.name}</label>
                          </>
                        }
                        {element.stockCount < 10 && element.stockCount > 5 &&
                          <>
                            <button className="roundButton whiteButton lowStock" style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${element.iconPath})` }} onClick={() => { if (items[index].stockCount > 0) { addToTransaction(items[index].prod_id) } else { createNotification('error', 'Error', 'Item out of stock', 3000) } }}>LOW STOCK</button>
                            <label className="d-block labelText">{element.name}</label>
                          </>
                        }
                        {element.stockCount <= 5 &&
                          <>
                            <button className="roundButton whiteButton noStock" style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url(${element.iconPath})` }} onClick={() => { if (items[index].stockCount > 0) { addToTransaction(items[index].prod_id) } else { createNotification('error', 'Error', 'Item out of stock', 3000) } }}>Only {items[index].stockCount} Left</button>
                            <label className="d-block labelText">{element.name}</label>
                          </>
                        }
                      </>
                    }
                  </div>
                })}
              </>
              :
              <></>}

          </div>
        </div>
        <div className="col-md-3 whiteBackground">
          <div className="row no-gutters">
            <div className="col-md-12 rightMenuHeight">
              <div className="row  no-gutters">
                <h3 className="pl-3 mr-auto">Current Transaction</h3>
                <button className="redButton butt25 mt-1" onClick={resetTrans}>Clear</button>
              </div>
              <div className="row transList no-gutters">
                {transaction[0] ?
                  <ul>
                    {transaction.map((element, index) => {
                      return <li  key={index}>
                        <div className="row">
                          <div className="col-xl-10">
                            <h4>
                              {allItems[element - 1].name}
                            </h4>
                          </div>
                          <div className="col-xl-2">
                            <h4>
                              {(allItems[element - 1].price / 100).toFixed(2)}
                            </h4>
                          </div>
                        </div>

                      </li>
                    })}
                  </ul>
                  :
                  <h5 className="pl-3">Cart Empty</h5>
                }
              </div>
            </div>
          </div>

          <div className="row no-gutters">
            <div className="col-md-12 rightMenuHeight">
              <h2 className="pl-3">TOTAL: ${total.toFixed(2)}</h2>
              <div className="dropdown-divider"></div>
              <div className="row  no-gutters">
                <h3 className="pl-3">Payment Options</h3>
              </div>
              <div className="row no-gutters">
                <div className="col-md-6">
                  <button className="greenButton butt50 mt-4 ml-3" data-toggle="modal" data-target="#cashModal" >Cash</button>
                </div>
                <div className="col-md-6">
                  <button className="greenButton butt50 mt-4 ml-3" data-toggle="modal" data-target="#eftModal" >Eft</button>
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-md-6">
                  <button className="greenButton butt50 mt-4 ml-3" data-toggle="modal" data-target="#splitModal" >Split</button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div >
  )
}
