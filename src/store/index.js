// import { createStore, applyMiddleware  } from "redux";
import {configureStore} from "@reduxjs/toolkit";
// import { combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { persistReducer , persistStore } from 'redux-persist';
import reducers from '../reducers';
import AsyncStorage from "@react-native-async-storage/async-storage";
import basketReducer from '../features/basketSlice';


const persistsConfig = {
   key:'root',
   storage: AsyncStorage,
   whitelist: ['auth','profileInfo','shipments','countries','offers','deals','ratingList','ratingGiven','ratingReceived','messagesList','myshipments','trips']
};
const persistedReducer = persistReducer(persistsConfig, reducers)


  export const store = configureStore(
   
    { 
      reducer: reducers,
    },
    // applyMiddleware(thunk)
);
