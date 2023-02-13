import {
    CANCEL_OFFER_FAILED,
    CANCEL_OFFER_SUCCESS,
    CANCEL_OFFER,
  } from '../actions/types';
  
  const INITIAL_STATE = { loadingcancel: false, error: '', annuler: false }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case CANCEL_OFFER:
        return { ...INITIAL_STATE, loadingcancel: true }
      case   CANCEL_OFFER_SUCCESS:
        return { ...INITIAL_STATE, loadingcancel: false, annuler: true }
      case CANCEL_OFFER_FAILED:
        return { ...INITIAL_STATE, loadingcancel: false, error: action.error }
      default:
        return state;
    }
  }