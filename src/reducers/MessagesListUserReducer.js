import {
  LOADING_USER_MESSAGES_FAILED,
  LOADING_USER_MESSAGES_SUCCESS,
  LOADING_USER_MESSAGES
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', messages: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_USER_MESSAGES:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_USER_MESSAGES_SUCCESS:
        return { ...INITIAL_STATE, loading: false, messages: action.messages}
      case LOADING_USER_MESSAGES_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }