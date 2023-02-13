import {
    EDITING_OFFER_FAILED,
    EDITING_OFFER,
    EDITING_OFFER_SUCCESS,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', edit: false  }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case EDITING_OFFER:
        return { ...INITIAL_STATE, loading: true }
      case EDITING_OFFER_SUCCESS:
        return { ...INITIAL_STATE, loading: false, edit: true }
      case EDITING_OFFER_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }