
import {
    SEND_FAILED,
    SEND_MESSAGE,
    SEND_SUCCESS,
    LOADING_MESSAGES_SUCCESS,
    LOADING_MESSAGES,
    LOADING_MESSAGES_FAILED,
    LOADING_USER_MESSAGES_FAILED,
    LOADING_USER_MESSAGES_SUCCESS,
    LOADING_USER_MESSAGES
  } from './types';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import { MESSAGES_FETCH_URL } from '../services/URLs';

  export const addMsg = ({ receiver_id , shipment_id,message}) => {
    return (dispatch) => {
        dispatch({ type: SEND_MESSAGE });
        AsyncStorage.getItem('app_token')
          .then(token => {
            const config = {
              headers: { 'Authorization': `Bearer ${token}` }
            };
  
            axios.post(MESSAGES_FETCH_URL,{receiver_id ,shipment_id, message}, config) 
            .then(resp => handleResponse(dispatch, resp.data))
              .catch(error =>   console.log(error));
         });
    }
  }
  const handleResponse = (dispatch, data ) => {
      if (data.status) {
        dispatch({ type: SEND_SUCCESS })
      }else{
        dispatch({ type: SEND_FAILED, error: data.message })
      }
    }
  
    export const fetchMessages  = () => {
      return (dispatch) => {
        dispatch({ type: LOADING_MESSAGES });
        AsyncStorage.getItem('app_token')
          .then(token => {
            const config = {
              headers: { 'Authorization': `Bearer ${token}` }
            };
            axios.get(MESSAGES_FETCH_URL, config)
              .then(resp => handleResponseFetch(dispatch, resp.data))
              .catch(error => console.log(error));
           });
      }
    }
    const handleResponseFetch = (dispatch, data ) => {
    if (data.status) { 
      dispatch({ type: LOADING_MESSAGES_SUCCESS, messages: data.messages })   
    }else{
       dispatch({ type: LOADING_MESSAGES_FAILED, error: data.message })
    }
    }


    export const fetchMyMessages  = ({id}) => {
      return (dispatch) => {
        dispatch({ type: LOADING_USER_MESSAGES });
        AsyncStorage.getItem('app_token')
          .then(token => {
            const config = {
              headers: { 'Authorization': `Bearer ${token}` }
            };
            axios.get(MESSAGES_FETCH_URL+'/'+id, config)
              .then(resp => handleResponseUser(dispatch, resp.data))
              .catch(error => console.log(error));
           });
      }
    }
    const handleResponseUser = (dispatch, data ) => {
    if (data.status) {  
      dispatch({ type: LOADING_USER_MESSAGES_SUCCESS, messages: data.messages })   
    }else{
       dispatch({ type: LOADING_USER_MESSAGES_FAILED, error: data.message })
    }
    }