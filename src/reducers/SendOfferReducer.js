import {
    ADDING_OFFER,
    ADDING_OFFER_FAILED,
    ADDING_OFFER_SUCCESS,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', saved: false }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case ADDING_OFFER:
        return { ...INITIAL_STATE, loading: true }
      case ADDING_OFFER_SUCCESS:
        return { ...INITIAL_STATE, loading: false, saved: true }
      case ADDING_OFFER_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }