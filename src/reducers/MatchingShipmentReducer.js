import {
    LOADING_MATCHING_SHIPMENT_SUCCESS,
    LOADING_MATCHING_SHIPMENT_FAILED,
    LOADING_MATHCING_SHIPMENT
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', suggestions: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_MATHCING_SHIPMENT:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_MATCHING_SHIPMENT_SUCCESS:
        return { ...INITIAL_STATE, loading: false, suggestions: action.suggestions}
      case LOADING_MATCHING_SHIPMENT_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }