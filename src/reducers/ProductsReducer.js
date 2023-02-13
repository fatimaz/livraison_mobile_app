import {
    LOADING_PRODUCTS_SUCCESS,
    LOADING_PRODUCTS,
    LOADING_PRODUCTS_FAILED,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', products: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_PRODUCTS:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_PRODUCTS_SUCCESS:
        return { ...INITIAL_STATE, loading: false, products: action.products}
      case LOADING_PRODUCTS_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }