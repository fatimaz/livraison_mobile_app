import {
    PROFILE_FAILED,
    PROFILE_SUCCESS,
    EDIT_PROFILE,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', saved: false  }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case EDIT_PROFILE:
        return { ...INITIAL_STATE, loading: true }
      case PROFILE_SUCCESS:
        return { ...INITIAL_STATE, loading: false, saved: true, saving: true  }
      case PROFILE_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }