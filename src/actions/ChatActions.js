import { FETCHING, MESSAGE_RECEIVED, ADDING_CHAT } from './types';
import {db} from '../screens/firebase';


// const handleData = (dispatch, data ) => {
//     const messages = [];
//     Object.values(data).forEach(msg => {
//         messages.unshift(msg);
//     });

//     dispatch({ type: MESSAGE_RECIVED, payload: messages });
// }

export const addMessage = (user_id, text) => {
    return (dispatch) => {
      dispatch({ type: ADDING_CHAT });

       axios.post("http://192.168.0.19:8000/api/chats/", {user_id, text})
          .then(resp => handleResponse(dispatch, resp.data))
          .catch(error =>  handleError(dispatch, error.response.data.msg))
       //});
    };
  }
  
  const handleResponse = (dispatch, data ) => {
    if (data.status) {
      dispatch({ type: ADDING_SUCCESS })
    }else{
      dispatch({ type: ADDING_FAILED, error: data.msg })
   }
  }

  export const sendMessage = (text, user) => {
    return (dispatch) => {
        const chatMessage = {
            text,
            author: user
        };

        firebase.database().ref('messages')
            .push(chatMessage);
    }
}
