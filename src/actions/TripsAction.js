import {
    ADDING_TRIP_FAILED,
    ADDING_TRIP,
    ADDING_TRIP_SUCCESS,

    EDITING_TRIP_FAILED,
    EDITING_TRIP,
    EDITING_TRIP_SUCCESS,

    LOADING_TRIP,
    LOADING_TRIP_SUCCESS,
    LOADING_TRIP_FAILED,

    LOADING_MYTRIP,
    LOADING_MYTRIP_SUCCESS,
    LOADING_MYTRIP_FAILED,

    DELETE_TRIP_SUCCESS,
    DELETE_TRIP_FAILED,
    DELETE_TRIP
} from './types';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_TRIPS_URL } from '../services/URLs';

export const fetchMyTrips  = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_TRIP });
    AsyncStorage.getItem('app_token')
    .then(token => {
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
        axios.get(GET_TRIPS_URL, config)
          .then(resp => handleResponsefetch(dispatch, resp.data))
          .catch(error => console.log(error));
       });
  }
}

const handleResponsefetch = (dispatch, data ) => {
  if (data.status) { 
 
    dispatch({ type: LOADING_TRIP_SUCCESS, trips: data.trips })   
  }else{
     dispatch({ type: LOADING_TRIP_FAILED, error: data.message })
  }
}


export const addTrip = ({vehicle_id,location_from,location_to,pickup_date,count, prix} ) => {
    return (dispatch) => {
      dispatch({ type: ADDING_TRIP });
      AsyncStorage.getItem('app_token')
    .then(token => {
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
    
       axios.post(GET_TRIPS_URL, {vehicle_id,location_from,location_to,pickup_date,count , prix}, config)
          .then(resp => handleResponse(dispatch, resp.data))
          .catch(error => console.log(error));
        });
    };
  }
  
  const handleResponse = (dispatch, data ) => {
    if (data.status) {
      dispatch({ type: ADDING_TRIP_SUCCESS })
    }else{
      dispatch({ type: ADDING_TRIP_FAILED, error: data.msg })
   }
  }
  const handleError = (dispatch, error) => {
    dispatch({ type: ADDING_TRIP_FAILED, payload: error });
};


export const cancelTrip = ({ id, type}) => {
  return (dispatch) => {
      dispatch({ type: EDITING_TRIP });
          axios.put(GET_TRIPS_URL+'/' +id, {type})
            .then(resp => handleResponseEdit(dispatch, resp.data))
            .catch(error => alert(error));
  }
}
   
  const handleResponseEdit = (dispatch, data ) => {
    if (data.status) {
      dispatch({ type: EDITING_TRIP_SUCCESS })
    }else{
      dispatch({ type: EDITING_TRIP_FAILED, error: data.msg })
   }
  }
  const handleErrorEdit = (dispatch, error) => {
    dispatch({ type: EDITING_TRIP_FAILED, payload: error });
};


export const deleteTrip = ({ id }) => {
  return (dispatch) => {
    dispatch({ type : DELETE_TRIP });
    AsyncStorage.getItem('app_token')
    .then(token => {
      const config = {
        headers: { 'Authorization': `Bearer ${token}`,'Content-Type' : 'multipart/form-data' }
      };
    axios.delete(GET_TRIPS_URL+'/'+ id, config)
    .then(resp => handleResponseDelete(dispatch, resp.data))
    .catch(error =>  handleErrorDelete(dispatch, error.response.data.msg))
  });
  }
}

const handleResponseDelete = (dispatch, data ) => {
  if (data.status) {
    dispatch({ type: DELETE_TRIP_SUCCESS })
  }else{
    dispatch({ type: DELETE_TRIP_FAILED, error: data.msg })
 }
}
const handleErrorDelete = (dispatch, message) => {
  dispatch({ type: DELETE_TRIP_FAILED, error:message})
}
