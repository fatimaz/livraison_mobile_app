import {
    LOADING_SHIPMENT_FAILED,
    LOADING_SHIPMENT_SUCCESS,
    LOADING_SHIPMENT
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', shipments: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_SHIPMENT:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_SHIPMENT_SUCCESS:
        return { ...INITIAL_STATE, loading: false, shipments: action.shipments}
      case LOADING_SHIPMENT_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }