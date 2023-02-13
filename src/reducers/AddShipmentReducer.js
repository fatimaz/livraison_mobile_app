import {
    ADDING__SHIPMENT_FAILED,
    ADDING_SHIPMENT,
    ADDING_SHIPMENT_SUCCESS,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', saved: false }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case ADDING_SHIPMENT:
        return { ...INITIAL_STATE, loading: true }
      case ADDING_SHIPMENT_SUCCESS:
        return { ...INITIAL_STATE, loading: false, saved: true }
      case ADDING__SHIPMENT_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }