import {
    EDITING_CART_FAILED,
    EDITING_CART,
    EDITING_CART_SUCCESS,
  } from '../actions/types';
  
  const INITIAL_STATE = { editing: false, error: '', saved: false  }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case EDITING_CART:
        return { ...INITIAL_STATE, editing: true }
      case EDITING_CART_SUCCESS:
        return { ...INITIAL_STATE, editing: false, saved: true }
      case EDITING_CART_FAILED:
        return { ...INITIAL_STATE, editing: false, error: action.error }
      default:
        return state;
    }
  }