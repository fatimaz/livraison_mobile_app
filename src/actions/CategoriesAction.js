import {
    LOADING_CATEGORIES_SUCCESS,
    LOADING_CATEGORIES,
    LOADING_CATEGORIES_FAILED,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CATEGORIES_FETCH_URL } from '../services/URLs';
import axios from 'axios';
import firebase from 'firebase';


  export const fetchCategories  = () => {
    return (dispatch) => {
      dispatch({ type: LOADING_CATEGORIES});
      //Get Token from local storage 
    //   AsyncStorage.getItem('app_token')
    //     .then(token => {
    //       //Call the back-end api
    //       const config = {
    //         headers: { 'Authorization': `Bearer ${token}` }
    //       };
          axios.get('http://192.168.1.136:8000/api/categories')
            .then(resp => handleResponseFetch(dispatch, resp.data))
            .catch(error => console.log(error));
        // });
    }
  }
const handleResponseFetch = (dispatch, data ) => {
  if (data.status) {  
    dispatch({ type: LOADING_CATEGORIES_SUCCESS, categories: data.categories })   
  }else{
     dispatch({ type: LOADING_CATEGORIES_FAILED, error: data.message })
  }
}



