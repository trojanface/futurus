// store.js
import React, {createContext, useState, useReducer} from 'react';

const initialState = 0; //prefilled data for testing purposes only
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, setState] = useState(initialState)
  // const [count, dispatch] = useReducer((state, action) => {

  //   if (action === "add") {
  //       console.log(action)
  //       return 1;
  //     } else if (action === "subtract") {
  //       return state - 1;
  //     } else {
  //       return state;
  //     }
  // }, initialState);

  return <Provider value={{ state, setState }}>{children}</Provider>;
};

export { store, StateProvider }