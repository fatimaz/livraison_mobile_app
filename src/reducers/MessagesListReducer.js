import {
    LOADING_MESSAGES_SUCCESS,
    LOADING_MESSAGES,
    LOADING_MESSAGES_FAILED,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', messages: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_MESSAGES:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_MESSAGES_SUCCESS:
        return { ...INITIAL_STATE, loading: false, messages: action.messages}
      case LOADING_MESSAGES_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }