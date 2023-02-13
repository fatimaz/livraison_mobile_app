import {
    DELETE_SHIPMENT_SUCCESS,
    DELETE_SHIPMENT_FAILED,
    DELETE_SHIPMENT
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', saved: false }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case DELETE_SHIPMENT:
        return { ...INITIAL_STATE, loading: true }
      case DELETE_SHIPMENT_SUCCESS:
        return { ...INITIAL_STATE, loading: false, saved: true }
      case DELETE_SHIPMENT_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }