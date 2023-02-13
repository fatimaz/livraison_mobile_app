import {
    SEND_LOCATION_FAILED,
    SEND_LOCATION,
    SEND_LOCATION_SUCCESS,
  } from './types';
  
  import axios from 'axios';
  import { SEND_LOCATION_URL } from '../services/URLs';


  export const countDist = ({  location_from, location_to  }) => {
    
    return (dispatch) => {
      dispatch({ type: SEND_LOCATION });
    
     axios.post(SEND_LOCATION_URL, { location_from, location_to } )
        .then(resp => handleResponse(dispatch, resp.data))
        .catch(error => handleError(dispatch, error.msg))
    }
}
const handleResponse = (dispatch, data) => {
  
    if (data.status) {
        dispatch({ type: SEND_LOCATION_SUCCESS, distance: data.distance }) 
    }else{
        dispatch({ type: SEND_LOCATION_FAILED, error: data.msg })
    }
}
const handleError = (dispatch, message) => {  

     dispatch({ type: SEND_LOCATION_FAILED, error: message});
}
    