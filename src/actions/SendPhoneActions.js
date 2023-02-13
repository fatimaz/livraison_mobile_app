import {
    SEND_PHONE,
    SEND_PHONE_SUCCESS,
    SEND_PHONE_FAILED
  } from './types';
  
  import axios from 'axios';
  import { PHONE_URL } from '../services/URLs';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const handleResponse = (dispatch, data) => {
  if (data.status) {
    dispatch({ type: SEND_PHONE_SUCCESS })
  }else{
    dispatch({ type: SEND_PHONE_FAILED, error: data.msg })
  }
  }
  const handleError = (dispatch, message) => {  
      dispatch({ type: SEND_PHONE_FAILED, error: message});
  }
  
  export const sendPhone = ({  mobile  }) => {

    return (dispatch) => {
      dispatch({ type: SEND_PHONE });

      AsyncStorage.getItem('app_token')
      .then(token => {
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };
    
      axios.post(PHONE_URL, { mobile }, config )
        .then(resp => handleResponse(dispatch, resp.data))
        .catch(error => handleError(dispatch, error.msg))
      });
    }
  }