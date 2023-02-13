import {
    LOADING_PRODUCTS_SUCCESS,
    LOADING_PRODUCTS,
    LOADING_PRODUCTS_FAILED,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PRODUCTS_FETCH_URL } from '../services/URLs';
import axios from 'axios';


  export const fetchProducts  = () => {
    return (dispatch) => {
      dispatch({ type: LOADING_PRODUCTS});
      //Get Token from local storage 
      // AsyncStorage.getItem('app_token')
      // .then(token => {
      //  //Call the back-end api
      //    const config = {
      //     headers: { 'Authorization': `Bearer ${token}` }
      // };
          axios.get('http://192.168.1.136:8000/api/products')
            .then(resp => handleResponseFetch(dispatch, resp.data))
            .catch(error => console.log(error));
        // });
    }
  }
const handleResponseFetch = (dispatch, data ) => {
  if (data.status) {  
    dispatch({ type: LOADING_PRODUCTS_SUCCESS, products: data.products })   
  }else{
     dispatch({ type: LOADING_PRODUCTS_FAILED, error: data.message })
  }
}

