import {
    LOADING_CATEGORIES_SUCCESS,
    LOADING_CATEGORIES,
    LOADING_CATEGORIES_FAILED,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', categories: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_CATEGORIES:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_CATEGORIES_SUCCESS:
        return { ...INITIAL_STATE, loading: false, categories: action.categories}
      case LOADING_CATEGORIES_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }