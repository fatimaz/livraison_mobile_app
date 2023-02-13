import {
    DELETE_TRIP_SUCCESS,
    DELETE_TRIP_FAILED,
    DELETE_TRIP
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', delete: false }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case DELETE_TRIP:
        return { ...INITIAL_STATE, loading: true }
      case DELETE_TRIP_SUCCESS:
        return { ...INITIAL_STATE, loading: false, delete: true }
      case DELETE_TRIP_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }