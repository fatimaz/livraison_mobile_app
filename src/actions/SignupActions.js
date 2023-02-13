import {
    SIGNUP_ATTEMPT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED
  } from './types';
  import axios from 'axios';
  import { SIGNUP_URL } from '../services/URLs';
  import AsyncStorage from '@react-native-async-storage/async-storage';

const handleResponse = (dispatch, data) => {
  if (data.status) {
    onSignupSuccess(dispatch, data.user, data.user.api_token) 
  }else{  
    dispatch({ type: SIGNUP_FAILED, error: data.msg })
  }
}

 const handleError = (dispatch, message) => {  
      dispatch({ type: SIGNUP_FAILED, error: message});
  }

  export const signupUser = ({  name, email, password }) => {
    return (dispatch) => {
      dispatch({ type: SIGNUP_ATTEMPT });   
 
      axios.post('http://192.168.1.35:8000/api/user/register', {  name, email, password } )
        .then(resp => 
          handleResponse(dispatch, resp.data))
        .catch(error => handleError(dispatch, error))
    }
  }


  const onSignupSuccess = (dispatch, user, token) => {
   
    AsyncStorage.setItem('app_token',token)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS, user: user })
      });
  
  };
  

  
