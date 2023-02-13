import {
    PASSWORD_FAILED,
    PASSWORD_SUCCESS,
    EDIT_PASSWORD,
  } from './types';
  
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import { PASSWORD_URL } from '../services/URLs';
  
  const handleResponse = (dispatch, data ) => {
    if (data.status) {
        dispatch({ type: PASSWORD_SUCCESS })
   }else{ 
        dispatch({ type: PASSWORD_FAILED, error: data.message })
    }
  }

  const handleError = (dispatch, message) => {
    dispatch({ type: BOOKING_FAILED, error:message})
  }

  
  export const editPassword = ({ password, newpassword }) => {
 
    return (dispatch) => {
      dispatch({ type: EDIT_PASSWORD });
      //Get Token from local storage
      AsyncStorage.getItem('app_token')
        .then(token => {   
          const config = {
            headers: { 'Authorization': `Bearer ${token}` }
          };    
   
          axios.post(PASSWORD_URL, { password, newpassword }, config )
            .then(resp => handleResponse(dispatch, resp.data))
            .catch(error =>console.log(data.error))
        });
    }   
  }


  
