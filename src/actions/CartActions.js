import {
   EDITING_CART_FAILED,
   EDITING_CART,
   EDITING_CART_SUCCESS,

    ADDING_CART,
    ADDING_CART_SUCCESS,
    ADDING_CART_FAILED,

    LOADING_CART_SUCCESS,
    LOADING_CART,
    LOADING_CART_FAILED,

    DELETE_CART_SUCCESS,
    DELETE_CART_FAILED,
    DELETE_CART,

} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SHIPMENT_FETCH_URL, MYSHIPMENT_FETCH_URL, SHIPMENT_UPDATE_URL, SHIPMENT_MATCHING_FETCH_URL } from '../services/URLs';
import axios from 'axios';


import firebase from './firebase';

export const addToCart = (cart_id,product_id,count, cost) => {
  return async (dispatch) => {
      
      dispatch({ type: ADDING_CART });
      const cartItem ={
        cart_id,
        product_id,
        count,
         cost
      }
      try {
           firebase.database().ref('carts').push(cartItem);
          dispatch({ type: ADDING_CART_SUCCESS });
      } catch (e) {
          dispatch({ type: ADDING_CART_FAILED });
      }
  };
};

export const envoiePostss = (text) => {
  return (dispatch) => {
      const chatMessage = {
          text,
      };

      db.ref('messages')
          .push(chatMessage);
  }
}


export const addPost = ({text, user}) => {
  return (dispatch) => {

      dispatch({ type: ADDING_CART });
alert(text)
      const postToSave = {
        text,
        author: user,
    };

              firebase.database().ref('posts').push(postToSave)
                  .then(() => {
                      dispatch({ type: ADDING_CART_SUCCESS });
                  })
                  .catch(error => handleError(dispatch, error.message));
         
  };
};

export const fetchMessges = () => {
  return (dispatch) => {
      dispatch({ type: FETCHING });
      db.ref('messages')
          .orderByKey()
          .limitToLast(30)
          .on('value', (snapshot) => {
              const data = snapshot.val() || [];
              handleData(dispatch, data);
          });
  }
}
const handleData = (dispatch, data ) => {
  const messages = [];
  Object.values(data).forEach(msg => {
      messages.unshift(msg);
  });

  dispatch({ type: MESSAGE_RECIVED, payload: messages });
}



// export const fetchMyCart  = () => {
// return (dispatch) => {
//   dispatch({ type: LOADING_CART });

//   // AsyncStorage.getItem('app_token')
//   //   .then(token => {
//   //     const config = {
//   //       headers: { 'Authorization': `Bearer ${token}` ,
//   //       'Content-Type' : 'multipart/form-data' }
//   //     };
  
//       axios.get('http://192.168.1.136:8000/api/carts')
//         .then(resp => handleResponseMYFetch(dispatch, resp.data))
//         .catch(error => console.log(error));
//     // });
// }
// }
// const handleResponseMYFetch = (dispatch, data ) => {
//     if (data.status) { 
//       dispatch({ type: LOADING_CART_SUCCESS, carts: data.carts })   
//     }else{
//       dispatch({ type: LOADING_CART_FAILED, error: data.message })
//     }
// }

// export const addCartItems = ({cart_id,product_id, count, cost } ) => {
//   return (dispatch) => {
//     dispatch({ type: ADDING_CART });
//     AsyncStorage.getItem('app_token')
//   // .then(token => {
//   //   const config = {
//   //     headers: { 'Authorization': `Bearer ${token}` }
//   //   };
  
//      axios.post('http://192.168.1.136:8000/api/carts', {cart_id,product_id, count, cost })
//         .then(resp => handleResponse(dispatch, resp.data))
//         .catch(error => console.log(error));
//      // });
//   };
// }


//    const handleResponse = (dispatch, data ) => {
//     if (data.status) {
//       dispatch({ type: ADDING_CART_SUCCESS })
//     }else{
//       dispatch({ type: ADDING_CART_FAILED, error: data.msg })
//    }
//   }


//   const handleError = (dispatch, message) => {
//     dispatch({ type: ADDING_CART_FAILED, error:message})
//   }


//   export const editCartItems = ({id,  cart_id,product_id, count, cost}) => {
//     return (dispatch) => {
//         dispatch({ type: EDITING_CART });
//             axios.put('http://192.168.1.136:8000/api/carts'+'/' +id, { cart_id,product_id, count, cost})
//               .then(resp => handleResponseEdit(dispatch, resp.data))
//               .catch(error => alert(error));
//     }
//   }
     
//     const handleResponseEdit = (dispatch, data ) => {
//       if (data.status) {
//         dispatch({ type: EDITING_CART_SUCCESS })
//       }else{
//         dispatch({ type: EDITING_CART_FAILED, error: data.msg })
//      }
//     }

//   export const deleteFromCart = ({ id }) => {
//     return (dispatch) => {
//       dispatch({ type : DELETE_CART });
//       axios.delete('http://192.168.1.136:8000/api/carts'+'/'+ id)
//       .then(resp => handleResponseDelete(dispatch, resp.data))
//       .catch(error =>  handleErrorDelete(dispatch, error.response.data.msg))
//     }
//   }

//   const handleResponseDelete = (dispatch, data ) => {
//     if (data.status) {
//       dispatch({ type: DELETE_CART_SUCCESS })
//     }else{
//       dispatch({ type: DELETE_CART_FAILED, error: data.msg })
//    }
//   }
//   const handleErrorDelete = (dispatch, message) => {
//     dispatch({ type: DELETE_CART_FAILED, error:message})
//   }
