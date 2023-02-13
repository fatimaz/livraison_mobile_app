import {
    LOADING_RATING_GIVEN_FAILED,
    LOADING_RATING_GIVEN_SUCCESS,
    LOADING_GIVEN_RATING
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', ratingsgiven: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_GIVEN_RATING:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_RATING_GIVEN_SUCCESS:
        return { ...INITIAL_STATE, loading: false, ratingsgiven: action.ratingsgiven}
      case LOADING_RATING_GIVEN_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }
