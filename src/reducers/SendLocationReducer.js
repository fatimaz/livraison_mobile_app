import {
    SEND_LOCATION_FAILED,
    SEND_LOCATION,
    SEND_LOCATION_SUCCESS,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', sent: false,  distance: '' }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case SEND_LOCATION:
        return { ...INITIAL_STATE, loading: true }
      case SEND_LOCATION_SUCCESS:
        return { ...INITIAL_STATE, loading: false, sent: true,  distance: action.distance }
      case SEND_LOCATION_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }