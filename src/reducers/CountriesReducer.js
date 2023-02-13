import {
    LOADING_COUNTRIES_SUCCESS,
    LOADING_COUNTRIES,
    LOADING_COUNTRIES_FAILED,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', countries: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_COUNTRIES:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_COUNTRIES_SUCCESS:
        return { ...INITIAL_STATE, loading: false, countries: action.countries}
      case LOADING_COUNTRIES_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }