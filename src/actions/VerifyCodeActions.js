import {
    VERIFY_CODE,
    VERIFY_CODE_SUCCESS,
    VERIFY_CODE_FAILED
  } from './types';

  import axios from 'axios';
  import { CODE_VERIFICATION_URL } from '../services/URLs';
  import AsyncStorage from '@react-native-async-storage/async-storage';



  const handleResponse = (dispatch, data) => {
    if (data.status) {
       dispatch({ type: VERIFY_CODE_SUCCESS })
    }else{
      dispatch({ type: VERIFY_CODE_FAILED, error: data.msg })
    }
  }
  const handleError = (dispatch, message) => {  
      dispatch({ type: VERIFY_CODE_FAILED, error: message});
  }
  
  export const verifyCode = ( {code} ) => {
    return (dispatch) => {
      dispatch({ type: VERIFY_CODE });
      AsyncStorage.getItem('app_token')
      .then(token => {
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };
    
      axios.post(CODE_VERIFICATION_URL, { code}, config )
        .then(resp => handleResponse(dispatch, resp.data))     
        .catch(error => handleError(dispatch, error.response.data.msg))
      });
    }
  }
  
  
