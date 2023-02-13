import {
    LOADING_OFFERS_SUCCESS,
    LOADING_OFFERS,
    LOADING_OFFERS_FAILED,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', offers: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_OFFERS:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_OFFERS_SUCCESS:
        return { ...INITIAL_STATE, loading: false, offers: action.offers}
      case LOADING_OFFERS_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }