import {
    SEND_EMAIL,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED
  } from './types';
  
  import axios from 'axios';
  import { FORGET_PASS_URL } from '../services/URLs';
  
  const handleResponse = (dispatch, data) => {
  if (data.status) {
    dispatch({ type: FORGET_PASSWORD_SUCCESS })
  }else{
    dispatch({ type: FORGET_PASSWORD_FAILED, error: data.msg })
  }
  }
  const handleError = (dispatch, message) => {  
      dispatch({ type: FORGET_PASSWORD_FAILED, error: msg});
  }
  
  export const forgetPassword = ({ email }) => {

    return (dispatch) => {
      dispatch({ type: SEND_EMAIL });
      axios.post(FORGET_PASS_URL, { email } )
        .then(resp => handleResponse(dispatch, resp.data))
        .catch(error => handleError(dispatch, error.msg))
  
    }
  }