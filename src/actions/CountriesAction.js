import {
    LOADING_COUNTRIES_SUCCESS,
    LOADING_COUNTRIES,
    LOADING_COUNTRIES_FAILED,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COUNTRIES_FETCH_URL } from '../services/URLs';
import axios from 'axios';


  export const fetchCountries  = () => {
    return (dispatch) => {
      dispatch({ type: LOADING_COUNTRIES });
      //Get Token from local storage 
    //   AsyncStorage.getItem('app_token')
    //     .then(token => {
    //       //Call the back-end api
          const config = {
            headers: {     
              Accept: 'application/json',
            'Content-Type': 'application/json' }
            
          };
          axios.get(COUNTRIES_FETCH_URL, config)
            .then(resp => handleResponseFetch(dispatch, resp.data))
            .catch(error => console.log(error));
    }
  }
const handleResponseFetch = (dispatch, data ) => {
  if (data.status) {  
    dispatch({ type: LOADING_COUNTRIES_SUCCESS, countries: data.countries })   
  }else{
     dispatch({ type: LOADING_COUNTRIES_FAILED, error: data.message })
  }
}

