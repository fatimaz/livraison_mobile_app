import {
    LOADING_DEAL,
    LOADING_DEAL_SUCCESS,
    LOADING_DEAL_FAILED,
    ADDING_OFFER_FAILED,
    ADDING_OFFER,
    ADDING_OFFER_SUCCESS,
    CANCEL_OFFER_FAILED,
    CANCEL_OFFER_SUCCESS,
    CANCEL_OFFER,
    EDITING_OFFER_FAILED,
    EDITING_OFFER,
    EDITING_OFFER_SUCCESS,
} from './types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { OFFERS_FETCH_URL, OFFERS_EDIT_URL } from '../services/URLs';
import axios from 'axios';


export const fetchMyDeals  = ({trip_id}) => {

  return (dispatch) => {

    dispatch({ type: LOADING_DEAL });
  
        axios.get(OFFERS_FETCH_URL+trip_id)
          .then(resp => handleResponse(dispatch, resp.data))
          .catch(error => console.log(error));
  }
}

const handleResponse = (dispatch, data ) => {
  if (data.status) {    
    dispatch({ type: LOADING_DEAL_SUCCESS, deals: data.deals })   
  }else{
     dispatch({ type: LOADING_DEAL_FAILED, error: data.message })
  }
}


//   export const fetchShipmentsOffers  = () => {
//     return (dispatch) => {
//       dispatch({ type: LOADING_OFFERS });
//       //Get Token from local storage 
//       //   AsyncStorage.getItem('app_token')
//       //     .then(token => {
//       //       //Call the back-end api
//       //       const config = {
//       //         headers: { 'Authorization': `Bearer ${token}` }
//      //       };
//           axios.get(OFFERS_FETCH_URL)
//             .then(resp => handleResponseFetch(dispatch, resp.data))
//             .catch(error => console.log(error));
//     //});
//     }
//   }
// const handleResponseFetch = (dispatch, data ) => {
//   if (data.status) {  
//     dispatch({ type: LOADING_OFFERS_SUCCESS, offers: data.offers  })   
//   }else{
//      dispatch({ type: LOADING_OFFERS_FAILED, error: data.message })
//   }
// }



export const makeOffer = ( shipment_id,trip_id,reward  ) => {

  return (dispatch) => {
    dispatch({ type: ADDING_OFFER });
    AsyncStorage.getItem('app_token')
    .then(token => {
    //   //Call the back-end api
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
    // const config = {
    // headers = {
    //   'Accept': 'application/json',
    //  // 'Authorization': 'Bearer ' + this.authToken,
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   }
    // };
     axios.post('https://www.yawyapp.com/api/offers', { shipment_id,trip_id,reward  }, config)
        .then(resp => handleResponseMakeOffer(dispatch, resp.data))
        .catch(error =>  handleError(dispatch, error.response.data.msg))
      });
  };
}

const handleResponseMakeOffer = (dispatch, data ) => {
  if (data.status) {
    dispatch({ type: ADDING_OFFER_SUCCESS })
  }else{
    dispatch({ type: ADDING_OFFER_FAILED, error: data.msg })
 }
}


export const cancelOffer = ({ id, type}) => {
  return (dispatch) => {
      dispatch({ type: CANCEL_OFFER });
      //Get Token from local storage
  
      // AsyncStorage.getItem('app_token')
      //   .then(token => {
      //     //Call the back-end api
      //     const config = {
      //       headers: { 'Authorization': `Bearer ${token}` }
      //     };
  
          axios.put(OFFERS_FETCH_URL +id, {type})
          //  , config)
            .then(resp => handleResponseC(dispatch, resp.data))
            .catch(error => console.log(error));
        // });
  }
}

const handleResponseC = (dispatch, data ) => {
 
    if (data.status) {
        dispatch({ type: CANCEL_OFFER_SUCCESS })
    }else{
        dispatch({ type: CANCEL_OFFER_FAILED, error: data.msg })
    }
}


export const editOffer = ({id, reward } ) => {
  return (dispatch) => {
    dispatch({ type: EDITING_OFFER });
     axios.post(OFFERS_EDIT_URL+ id, {reward  })
        .then(resp => handleResponseEdit(dispatch, resp.data))
        .catch(error =>  handleErrorEdit(dispatch, error.response.data.msg))
  };
}

const handleResponseEdit = (dispatch, data ) => {
  if (data.status) {
    dispatch({ type: EDITING_OFFER_SUCCESS })
  }else{
    dispatch({ type: EDITING_OFFER_FAILED, error: data.msg })
 }
}
const handleErrorEdit = (dispatch, error) => {
  dispatch({ type: EDITING_OFFER_FAILED, payload: error });
};
