import {
    LOADING_VEHICLE,
    LOADING_VEHICLE_SUCCESS,
    LOADING_VEHICLE_FAILED,
} from './types';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_VEHICLE_URL } from '../services/URLs';

export const fetchVehicles  = () => {
  console.log(100)
  return (dispatch) => {
    dispatch({ type: LOADING_VEHICLE });
        axios.get('http://192.168.1.136:8000/api/vehicles')
          .then(resp => handleResponsefetch(dispatch, resp.data))
          .catch(error =>    alert(8));
    }
}

const handleResponsefetch = (dispatch, data ) => {
  alert(10)
  if (data.status) {  
    alert(1)
    dispatch({ type: LOADING_VEHICLE_SUCCESS, vehicles: data.vehicles })   
  }else{
    alert(2)
     dispatch({ type: LOADING_VEHICLE_FAILED, error: data.message })
  }
}


