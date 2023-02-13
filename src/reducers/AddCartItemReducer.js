import {
    ADDING_CART_FAILED,
    ADDING_CART,
    ADDING_CART_SUCCESS,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', saved: false }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case ADDING_CART:
        return { ...INITIAL_STATE, loading: true }
      case ADDING_CART_SUCCESS:
        return { ...INITIAL_STATE, loading: false, saved: true }
      case ADDING_CART_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }