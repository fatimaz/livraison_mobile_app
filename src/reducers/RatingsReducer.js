import {
    LOADING_RATING_FAILED,
    LOADING_RATING_SUCCESS,
    LOADING_RATING
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', ratings: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_RATING:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_RATING_SUCCESS:
        return { ...INITIAL_STATE, loading: false, ratings: action.ratings}
      case LOADING_RATING_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }
