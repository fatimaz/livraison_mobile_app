import {
    LOADING_RATING_RECEIVED_FAILED,
    LOADING_RATING_RECEIVED_SUCCESS,
    LOADING_RECEIVED_RATING
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', ratingsreceived: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_RECEIVED_RATING:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_RATING_RECEIVED_SUCCESS:
        return { ...INITIAL_STATE, loading: false, ratingsreceived: action.ratingsreceived}
      case LOADING_RATING_RECEIVED_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }
