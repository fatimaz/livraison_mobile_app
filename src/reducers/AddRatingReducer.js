import {
    RATING_FAILED,
    RATING_SUCCESS,
    RATING_USER,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', saved: false }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case RATING_USER:
        return { ...INITIAL_STATE, loading: true }
      case RATING_SUCCESS:
        return { ...INITIAL_STATE, loading: false, saved: true }
      case RATING_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }