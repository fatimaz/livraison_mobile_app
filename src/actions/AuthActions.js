import {
    LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_FAILED
  } from './types';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import { LOGIN_URL } from '../services/URLs';

  const onLoginFailed = (dispatch, errorMessage) => {
    dispatch({ type: LOGIN_FAILED, error: errorMessage})
  };


    
  const onLoginSuccess = (dispatch, user, token, id) => {
    AsyncStorage.setItem('user_id',id.toString())   .then(() => {
      console.log('')
    });
    AsyncStorage.setItem('app_token',token)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS, payload: user })
      });
  
  };
  const handleResponse = (dispatch, data) => {
    if (!data.status) { 
      onLoginFailed(dispatch, data.msg);
    } else {
      onLoginSuccess(dispatch, data.user, data.user.api_token , data.user.id)
    }
  }
  export const loginUser = ({ email, password }) => {
    return (dispatch) => {
     dispatch({ type: LOGIN_ATTEMPT });
     axios.post(LOGIN_URL, 
      { email, password })
        .then(resp => handleResponse(dispatch, resp.data))
        .catch(error => alert(error));
    };
  }
  //   export const loginUser = ({ email, password }) => {
  //   return (dispatch) => {
  //    dispatch({ type: LOGIN_ATTEMPT });
  //    const config = { headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json' 
      
  // },}

  // const url ='https://yawyapp.com/api/user/login';

  //    axios.post(url, 
  //     { email, password },config)
  //       .then(resp => alert(JSON. stringify(resp) ))
  //       .catch(error => alert(error));
  //   };
  // }


  

  // export const loginUser = ({ email, password }) => {
  //   const data = `email=${email}&Password=${password}&grant_type=password`
  //       return (dispatch) => {
  //           dispatch({ type: LOGIN_ATTEMPT })
    
  //           fetch(LOGIN_URL, {
  //               method: 'POST',
  //               headers: {
  //                   'Accept': 'application/json',
  //                   'Content-Type': 'application/json',
  //               },
  //               body: data
  //               // body: {
    
  //               //     UserName: userName,
  //               //     Password: password,
  //               //     grant_type: 'password'
    
  //               // }
    
  //           })
  //               .then((response) => { 
  //                 alert(1)
  //                 onLoginSuccess(dispatch, response)
  //               })
  //               .catch((response) => {
  //                 alert(2)
  //                 onLoginFailed(dispatch, response)
  //               })
  //       };
  //   };