import {
    RATING_FAILED,
    RATING_SUCCESS,
    RATING_USER,
    
    LOADING_RATING_FAILED,
    LOADING_RATING_SUCCESS,
    LOADING_RATING,

    LOADING_RATING_RECEIVED_FAILED,
    LOADING_RATING_RECEIVED_SUCCESS,
    LOADING_RECEIVED_RATING,

    LOADING_RATING_GIVEN_FAILED,
    LOADING_RATING_GIVEN_SUCCESS,
    LOADING_GIVEN_RATING
  } from './types';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import { RATING_FETCH_URL, RATING_GIVEN_FETCH_URL,RATING_RECEIVED_FETCH_URL } from '../services/URLs';
  
export const addRating = ({receiver_id,order_id, stars, review, rated}) => {

  return (dispatch) => {
      dispatch({ type: RATING_USER });
      //Get Token from local storage
      AsyncStorage.getItem('app_token')
        .then(token => {
          const config = {
            headers: { 'Authorization': `Bearer ${token}` }
          };
          axios.post(RATING_FETCH_URL ,{receiver_id,order_id, stars, review, rated}, config) 
            .then(resp => handleResponse(dispatch, resp.data))
            .catch(error => console.log(error));
        });
  }
}
  
const handleResponse = (dispatch, data ) => {
    if (data.status) {  
      dispatch({ type: RATING_SUCCESS })
    }else{
      dispatch({ type: RATING_FAILED, error: data.message })
    }
  }
  

  
export const fetchRatings = ({id}) => {

    return (dispatch) => {
      dispatch({ type: LOADING_RATING });
    
      //Get Token from local storage 
      // AsyncStorage.getItem('app_token')
      //   .then(token => {
      //     //Call the back-end api
      //     const url = RATING_FETCH_URL;
      //     const config = {
      //       headers: { 'Authorization': `Bearer ${token}` }
      //     };
          axios.get(RATING_FETCH_URL+'/'+id)
            .then(resp => handleResponseFetch(dispatch, resp.data))
            .catch(error => console.log(error));
    }
}
const handleResponseFetch = (dispatch, data ) => {
    if (data.status) { 
      dispatch({ type: LOADING_RATING_SUCCESS, ratings: data.userratings })   
    }else{
       dispatch({ type: LOADING_RATING_FAILED, error: data.message })
    }
}

export const fetchReceivedMyRatings = () => {

  return (dispatch) => {
    dispatch({ type: LOADING_RECEIVED_RATING });

    AsyncStorage.getItem('app_token')
      .then(token => {
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.get(RATING_RECEIVED_FETCH_URL, config)
          .then(resp => handleResponseFetchReceived(dispatch, resp.data))
          .catch(error => console.log(error));
      });
  }
}

const handleResponseFetchReceived = (dispatch, data ) => {
  if (data.status) { 
    dispatch({ type: LOADING_RATING_RECEIVED_SUCCESS, ratingsreceived: data.ratings })   
  }else{
     dispatch({ type: LOADING_RATING_RECEIVED_FAILED, error: data.message })
  }
}

export const fetchGivenMyRatings = () => {

  return (dispatch) => {
    dispatch({ type: LOADING_GIVEN_RATING });

    AsyncStorage.getItem('app_token')
      .then(token => {
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.get(RATING_GIVEN_FETCH_URL, config)
          .then(resp => handleResponseFetchGiven(dispatch, resp.data))
          .catch(error => console.log(error));
       });
  }
}
const handleResponseFetchGiven = (dispatch, data ) => {
  if (data.status) { 
    dispatch({ type: LOADING_RATING_GIVEN_SUCCESS, ratingsgiven: data.ratings })   
  }else{
     dispatch({ type: LOADING_RATING_GIVEN_FAILED, error: data.message })
  }
}
