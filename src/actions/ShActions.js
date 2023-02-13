import {
    ADDING_FAILED,
    ADDING_SHIPMENT,
    ADDING_SUCCESS,
    FETCHING,
    FETCHING_DONE
} from './types';

import axios from 'axios';

export const addShipment = (from, to, postImage) => {

    return (dispatch) => {
      dispatch({ type: ADDING_SHIPMENT });
     // let data = {  from, to , expected_date, link, name, price,  weight,  qty, description, category_id,  shipmentImage };
      const formData = new FormData();
 
      formData.append('from',from);
      formData.append('to',to);   
      formData.append('postImage',postImage);  
          const config = {
             headers:{
                  'Content-Type' : 'multipart/form-data',
            }
        };

    
       axios.post("http://192.168.1.11:8000/api/shipments/", formData, config,{})
          .then(resp => handleResponse(dispatch, resp.data))
          .catch(error =>  alert('u 2åå'))
    };
  }
  const handleResponse = (dispatch, data ) => {
      alert('u ')
    // if (data.status) {
      alert(JSON.stringify(data))
      dispatch({ type: ADDING_SUCCESS })
      alert(JSON.stringify('u '+data.msg ))
//     }else{
//       dispatch({ type: BOOKING_FAILED, error: data.msg })
//    }
  }

  const handleError = (dispatch, message) => {
    dispatch({ type: ADDING_FAILED, error:message})
  }




