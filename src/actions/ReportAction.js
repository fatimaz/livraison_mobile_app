import {
    REPORT_FAILED,
    ADDING_REPORT,
    REPORT_SUCCESS,
  } from './types';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import { REPORT_URL } from '../services/URLs';

  export const sendReport = ({ sujet, message, order_id }) => {

    return (dispatch) => {
        dispatch({ type: ADDING_REPORT });
 
        AsyncStorage.getItem('app_token')
          .then(token => {
            const config = {
              headers: { 'Authorization': `Bearer ${token}` }
            };
  
            axios.post(REPORT_URL,{sujet, message, order_id }, config) 
              .then(resp => handleResponse(dispatch, resp.data))
              .catch(error =>  console.log(error));
         });
    }
  }
  const handleResponse = (dispatch, data ) => {
      if (data.status) {
        dispatch({ type: REPORT_SUCCESS })
      }else{
        dispatch({ type: REPORT_FAILED, error: data.message })
      }
    }
  

