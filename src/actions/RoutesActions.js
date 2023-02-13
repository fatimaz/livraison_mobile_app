import {
    LOADING_VEHICLE,
    LOADING_VEHICLE_SUCCESS,
    LOADING_VEHICLE_FAILED,
} from './types';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_VEHICLE_URL } from '../services/URLs';

export const fetchRoutes  = ({ location_from, location_to, counter, pickup_date}) => {
  return (dispatch) => {
    dispatch({ type: LOADING_VEHICLE });
        axios.post('http://192.168.1.136:8000/api/routes', { location_from, location_to, counter, pickup_date } )
          .then(resp => handleResponsefetch(dispatch, resp.data))
          .catch(error =>  console.log(error));
    }
}

const handleResponsefetch = (dispatch, data ) => {
  if (data.status) {  
    dispatch({ type: LOADING_VEHICLE_SUCCESS, routes: data.routes })   
  }else{
     dispatch({ type: LOADING_VEHICLE_FAILED, error: data.message })
  }
}


