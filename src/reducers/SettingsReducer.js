
import {
    LOADING_PROFILE_FAILED,
    LOADING_PROFILE_SUCCESS,
    LOADING_PROFILE
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', profile:{} }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case LOADING_PROFILE:
        return { ...INITIAL_STATE, loading: true }
      case LOADING_PROFILE_SUCCESS:
        return { ...INITIAL_STATE, loading: false ,profile: action.profile}
      case LOADING_PROFILE_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }