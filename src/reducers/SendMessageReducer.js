import {
  SEND_FAILED,
  SEND_MESSAGE,
  SEND_SUCCESS,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', saved: false }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case SEND_MESSAGE:
        return { ...INITIAL_STATE, loading: true }
      case SEND_SUCCESS:
        return { ...INITIAL_STATE, loading: false, saved: true }
      case SEND_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }