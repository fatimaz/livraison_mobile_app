import {
    LOADING_MYSHIPMENT_FAILED,
    LOADING_MYSHIPMENT_SUCCESS,
    LOADING_MYSHIPMENT
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', myshipments: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_MYSHIPMENT:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_MYSHIPMENT_SUCCESS:
        return { ...INITIAL_STATE, loading: false, myshipments: action.myshipments}
      case LOADING_MYSHIPMENT_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }