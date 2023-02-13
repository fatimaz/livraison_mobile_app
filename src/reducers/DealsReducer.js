import {
    LOADING_DEAL,
    LOADING_DEAL_SUCCESS,
    LOADING_DEAL_FAILED
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', deals: [] }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_DEAL:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_DEAL_SUCCESS:
        return { ...INITIAL_STATE, loading: false, deals: action.deals}
      case LOADING_DEAL_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }