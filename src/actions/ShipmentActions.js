import {
  EDITING_SHIPMENT_FAILED,
  EDITING_SHIPMENT,
  EDITING_SHIPMENT_SUCCESS,

    ADDING_SHIPMENT,
    ADDING_SHIPMENT_SUCCESS,
    ADDING_SHIPMENT_FAILED,

    LOADING_SHIPMENT_SUCCESS,
    LOADING_SHIPMENT,
    LOADING_SHIPMENT_FAILED,

    LOADING_MYSHIPMENT_SUCCESS,
    LOADING_MYSHIPMENT,
    LOADING_MYSHIPMENT_FAILED,

    DELETE_SHIPMENT_SUCCESS,
    DELETE_SHIPMENT_FAILED,
    DELETE_SHIPMENT,

    LOADING_MATCHING_SHIPMENT_SUCCESS,
    LOADING_MATCHING_SHIPMENT_FAILED,
    LOADING_MATHCING_SHIPMENT

} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SHIPMENT_FETCH_URL, MYSHIPMENT_FETCH_URL, SHIPMENT_UPDATE_URL, SHIPMENT_MATCHING_FETCH_URL } from '../services/URLs';
import axios from 'axios';

export const fetchShipments  = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_SHIPMENT });
    //Get Token from local storage 
    AsyncStorage.getItem('app_token')
      .then(token => {
        //Call the back-end api
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };
        axios.get(SHIPMENT_FETCH_URL, config)
          .then(resp => handleResponseFetch(dispatch, resp.data))
          .catch(error => console.log(error));
       });
  }
}
const handleResponseFetch = (dispatch, data ) => {
if (data.status) { 
  dispatch({ type: LOADING_SHIPMENT_SUCCESS, shipments: data.shipments })   
}else{
   dispatch({ type: LOADING_SHIPMENT_FAILED, error: data.message })
}
}

export const fetchMyShipments  = () => {
return (dispatch) => {
  dispatch({ type: LOADING_MYSHIPMENT });

  AsyncStorage.getItem('app_token')
    .then(token => {
      const config = {
        headers: { 'Authorization': `Bearer ${token}` ,
        'Content-Type' : 'multipart/form-data' }
      };
  
      axios.get(MYSHIPMENT_FETCH_URL, config)
        .then(resp => handleResponseMYFetch(dispatch, resp.data))
        .catch(error => console.log(error));
     });
}
}
const handleResponseMYFetch = (dispatch, data ) => {
    if (data.status) { 
      dispatch({ type: LOADING_MYSHIPMENT_SUCCESS, myshipments: data.myshipments })   
      }else{
      dispatch({ type: LOADING_MYSHIPMENT_FAILED, error: data.message })
      }
}

export const addShipment = ({from, to, expected_date,link, name, price, qty, description, photo}) => {
   return (dispatch) => {
      dispatch({ type: ADDING_SHIPMENT });
      const formData = new FormData();
      formData.append('from',from);
      formData.append('to',to);
      formData.append('expected_date',expected_date);
      formData.append('link',link);
      formData.append('qty',qty);
      formData.append('name',name);
      formData.append('price',price);
      formData.append('description',description);
    
      formData.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri,
          //Platform.OS === "android" ? photo.uri : photo.uri.toString().replace("file://", "")
      });

      AsyncStorage.getItem('app_token')
      .then(token => {
        const config = {
          headers: { 'Authorization': `Bearer ${token}`,'Content-Type' : 'multipart/form-data' }
        };  
       axios.post(SHIPMENT_FETCH_URL, formData,config, {})
          .then(resp => handleResponse(dispatch, resp.data))
          .catch(error =>  handleError(dispatch, error.response.data.msg))
       });
    };
  }
   const handleResponse = (dispatch, data ) => {
    if (data.status) {
      dispatch({ type: ADDING_SHIPMENT_SUCCESS })
    }else{
      dispatch({ type: ADDING_SHIPMENT_FAILED, error: data.msg })
   }
  }


  const handleError = (dispatch, message) => {
    dispatch({ type: ADDING_SHIPMENT_FAILED, error:message})
  }


  export const editShipment = ({id, user_id, from, to, expected_date,link, name, price, qty, description, photo}) => {
 
    return (dispatch) => {
      dispatch({ type: EDITING_SHIPMENT });
      const formData = new FormData();
      formData.append('from',from);
      formData.append('to',to);
      formData.append('expected_date',expected_date);
      formData.append('id',id);
      formData.append('user_id',user_id);
      formData.append('link',link);
      formData.append('qty',qty);
      formData.append('name',name);
      formData.append('price',price);
      formData.append('description',description);

     if(photo.uri){
      formData.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri,
            // Platform.OS === "android" ? photo.uri : photo.uri.toString().replace("file://", "")
       });
      }
      const config = {
        headers: { 'Content-Type' : 'multipart/form-data' }
      }; 

       axios.post(SHIPMENT_UPDATE_URL, formData,config,{})
          .then(resp => handleResponseEdit(dispatch, resp.data))
          .catch(error =>  handleErrorEdit(dispatch, error.response.data.msg))
    };
  }
   const handleResponseEdit = (dispatch, data ) => {
    if (data.status) {
      dispatch({ type: EDITING_SHIPMENT_SUCCESS })
    }else{
      dispatch({ type: EDITING_SHIPMENT_FAILED, error: data.msg })
   }
  }

  const handleErrorEdit = (dispatch, message) => {
    dispatch({ type: EDITING_SHIPMENT_FAILED, error: data.msg })
  }

  export const deleteShipment = ({ id }) => {
    return (dispatch) => {
      dispatch({ type : DELETE_SHIPMENT });
      axios.delete(SHIPMENT_FETCH_URL+'/'+ id)
      .then(resp => handleResponseDelete(dispatch, resp.data))
      .catch(error =>  handleErrorDelete(dispatch, error.response.data.msg))
    }
  }

  const handleResponseDelete = (dispatch, data ) => {
    if (data.status) {
      dispatch({ type: DELETE_SHIPMENT_SUCCESS })
    }else{
      dispatch({ type: DELETE_SHIPMENT_FAILED, error: data.msg })
   }
  }
  const handleErrorDelete = (dispatch, message) => {
    dispatch({ type: DELETE_SHIPMENT_FAILED, error:message})
  }


  export const fetchmatchingShipments  = ({id}) => {
    return (dispatch) => {
      dispatch({ type: LOADING_MATHCING_SHIPMENT });
      AsyncStorage.getItem('app_token')
        .then(token => {
          const config = {
            headers: { 'Authorization': `Bearer ${token}` }
          };

          axios.get(SHIPMENT_MATCHING_FETCH_URL+id, config)
            .then(resp => handleResponseMatch(dispatch, resp.data))
            .catch(error => console.log(error));
          });
    }
  }
  const handleResponseMatch = (dispatch, data ) => {
  if (data.status) {  
    dispatch({ type: LOADING_MATCHING_SHIPMENT_SUCCESS, suggestions: data.suggestions })   
  }else{
     dispatch({ type: LOADING_MATCHING_SHIPMENT_FAILED, error: data.message })
  }
  }