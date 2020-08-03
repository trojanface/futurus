import React, { useState, useEffect } from 'react'
import Inputbox from '../../components/CheckBox/Inputbox'
import API from '../../utils/API'
import Dashboard from '../Dashboard/Dashboard'
import { NotificationContainer } from 'react-notifications'
import createNotification from '../../components/CheckBox/Notification'

export default function ItemDesigner() {
  //intialisation of states & variables
  const [departments, setDept] = useState([])
  const [items, setItems] = useState([])
  const [selectedDept, setSelectD] = useState(0)
  const [selectedItem, setSelectI] = useState({})
  const [selected, setSelected] = useState(0)
  const [testState, setTestState] = useState(false)
  let newDept = "";
  const [newItem, setNewItem] = useState({ name: "", cost: 0, price: 0, departments: 0, isActive: true, upsell: '', iconPath: '' });

  //load departments on start
  useEffect(() => {
    getDepartments();
  }, [])

  //retrieve departments from database and store in state.
  function getDepartments() {
    API.getDepts().then((res) => {
      setDept(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  //interpret changes from input boxes
  function itemChange(change) {
    selectedItem[0][change[0].arrayTitle] = change[1]
  }

  //send changes to database
  function submitChanges() {
    API.updateItem(selectedItem[0]).then(() => {
      createNotification('success', 'Success', 'Item updated', 3000)
      setSelectI({})
      retrieveItems(selectedDept - 1)
    }).catch((err) => {
      createNotification('error', 'Error', err, 5000)
    });
  }

  //deactivate a department in the database
  function deleteDept(index) {
    API.deleteDept(index + 1).then(() => {
      createNotification('success', 'Success', 'Department deleted', 3000)
      getDepartments()
    }).catch((err) => {
      createNotification('error', 'Error', err, 5000)
    });
  }

  //deactivate an item in the database
  function deleteItem() {
    API.deleteItem(selected).then(() => {
      createNotification('success', 'Success', 'Item deleted', 3000)
      setSelectI({})
      retrieveItems(selectedDept - 1)
    }).catch((err) => {
      createNotification('error', 'Error', err, 5000)
    });
  }

  //retrieve an item from the database
  function retrieveItem(prod_id, index) {
    setSelected(prod_id);
    API.getItem(prod_id).then((res) => {
      res.data[0].cost = res.data[0].cost / 100;
      res.data[0].price = res.data[0].price / 100;
      setSelectI(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  //get all items from the database with a particular department
  function retrieveItems(index) {
    setSelectD(index + 1);
    API.getItems(index).then((res) => {
      setItems(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  //interpret a change between selected departments
  function newDeptInput(change) {
    newDept = change[1];
  }

  //add a new department to the database
  function submitNewDept() {
    API.addDept(newDept).then(() => {
      createNotification('success', 'Success', 'Department created', 3000)
      getDepartments()
    }).catch((err) => {
      createNotification('error', 'Error', err, 5000)
    });
  }

  //add a new item to the database
  function submitNewItem() {
    newItem.departments = selectedDept - 1;
    API.addItem(newItem).then(() => {
      createNotification('success', 'Success', 'Item created', 3000)
      retrieveItems(selectedDept - 1)
    }).catch((err) => {
      createNotification('error', 'Error', err, 5000)
    });
  }

  //interpret a change from input box on the new item template
  function newItemChange(change) {
    let tempItem = newItem
    tempItem[change[0].arrayTitle] = change[1]
    setNewItem(tempItem);
  }

  return (
    <div className="row no-gutters">
      <NotificationContainer />
      <div className="col-md-3 text-center">
        <Dashboard />
      </div>
      <div className="col-md-9 d-flex justify-content-center">
        <div className="container">
          <div className="modal fade" id="deptModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content blueBackground">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Create New Department</h5>
                </div>
                <div className="modal-body">
                  <Inputbox arrayTitle="name" changeValue={newDeptInput} title="Department Name" placehold="" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary redButton" data-dismiss="modal">Cancel</button>
                  <button onClick={submitNewDept} type="button" className="btn btn-primary greenButton" data-dismiss="modal">Create Department</button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="itemModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content blueBackground">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Create New Item</h5>
                </div>
                <div className="modal-body">
                  <Inputbox arrayTitle="name" changeValue={newItemChange} title="Item Name" placehold="" />
                  <Inputbox arrayTitle="cost" changeValue={newItemChange} title="Cost Price" placehold="" />
                  <Inputbox arrayTitle="price" changeValue={newItemChange} title="Retail Price" placehold="" />
                  <Inputbox arrayTitle="iconPath" changeValue={newItemChange} title="Image Path" placehold="" />
                  {selectedDept ? <p>Department: {departments[selectedDept - 1].name}</p> : <></>}
                  <div className="dropdown">
                    <button className="btn btn-secondary greenButton dropdown-toggle" type="button" id="upsellMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Upsell Weather: {newItem.upsell}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="upsellMenuButton">
                      <button onClick={() => { newItemChange([{ arrayTitle: 'upsell' }, '']); setTestState(!testState); }} className="dropdown-item" >None</button>
                      <button onClick={() => { newItemChange([{ arrayTitle: 'upsell' }, 'hot']); setTestState(!testState); }} className="dropdown-item" >Hot</button>
                      <button onClick={() => { newItemChange([{ arrayTitle: 'upsell' }, 'cold']); setTestState(!testState); }} className="dropdown-item">Cold</button>
                    </div>
                  </div>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary redButton" data-dismiss="modal">Cancel</button>
                  <button onClick={submitNewItem} type="button" className="btn btn-primary greenButton" data-dismiss="modal">Create Item</button>
                </div>
              </div>
            </div>
          </div>


          <div className="row blueBackground">
            <div className="col-md-3 whiteBackground blueHighlight pt-4">
              <h5>Departments</h5>
              <ul className="noStyle">
                {departments.map((element, index) => {
                  return <li className="d-inline" key={index}>
                    <button className="d-inline blueButton butt75 mtb-2" onClick={() => retrieveItems(index)}>{element.name}</button>
                    <button onClick={() => deleteDept(index)} className="d-inline redButton butt25 mtb-2"><i class="fa fa-trash" aria-hidden="true"></i></button>
                  </li>
                })}
                <li>
                  <button className="greenButton butt75 mtb-2" data-toggle="modal" data-target="#deptModal" >Create Department</button>
                </li>
              </ul>
            </div>
            <div className="col-md-3 whiteBackground blueHighlight pt-4">
              <h5>Items</h5>
              <ul className="noStyle">
                {departments[0] ?
                  items[0] ? items.map((element, index) => {
                    return <li key={index}>
                      <button className="blueButton butt75 mtb-2" onClick={() => retrieveItem(element.prod_id, index)}>{element.name}</button>
                    </li>
                  }) : <> </> : <> </>}
                {selectedDept ? <button className="greenButton butt75 mtb-2" data-toggle="modal" data-target="#itemModal" >Create Item</button> : <></>}
              </ul>
            </div>
            <div className="col-md-6 whiteBackground blueHighlight pt-4">
              {selectedItem[0] ?
                <>
                  <h5>{selectedItem[0].name}</h5>
                  <Inputbox arrayTitle="name" changeValue={itemChange} title="Name" placehold={selectedItem[0].name} />
                  <Inputbox arrayTitle="cost" changeValue={itemChange} title="Cost Price" placehold={selectedItem[0].cost} />
                  <Inputbox arrayTitle="price" changeValue={itemChange} title="Retail Price" placehold={selectedItem[0].price} />
                  <Inputbox arrayTitle="iconPath" changeValue={itemChange} title="Image Path" placehold={selectedItem[0].iconPath} />
                  <div className="dropdown">
                    <button className="btn btn-secondary greenButton dropdown-toggle mt-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Department: {departments[selectedItem[0].department - 1].name}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {departments[0] ?
                        departments.map((element, index) => {
                            return <button key={index} onClick={() => {
                            let tempArray = selectedItem;
                            tempArray[0].department = (index + 1);
                            setSelectI(tempArray);
                            setTestState(!testState)
                          }} className="dropdown-item" >{element.name}</button>

                        })
                        : <> </>}
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="btn btn-secondary greenButton dropdown-toggle mt-2" type="button" id="upsellMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Upsell Weather: {selectedItem[0].upsell}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="upsellMenuButton">
                      <button onClick={() => { itemChange([{ arrayTitle: 'upsell' }, '']); setTestState(!testState); }} className="dropdown-item" >None</button>
                      <button onClick={() => { itemChange([{ arrayTitle: 'upsell' }, 'hot']); setTestState(!testState); }} className="dropdown-item" >Hot</button>
                      <button onClick={() => { itemChange([{ arrayTitle: 'upsell' }, 'cold']); setTestState(!testState); }} className="dropdown-item">Cold</button>
                    </div>
                  </div>
                </>
                : <h5>Please select a department and an item first</h5>}


            </div>
          </div>
          {selectedItem[0] ?

            <div className="row">
              <div className="col-md-6">
                <button className="greenButton butt50" onClick={submitChanges}>Save Changes</button>
              </div>
              <div className="col-md-6">
                <button className="redButton butt50" onClick={deleteItem}>Delete Item</button>
              </div>
            </div>
            : <> </>
          }
        </div>
      </div>
    </div >
  )
}
