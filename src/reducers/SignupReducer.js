import {
    SIGNUP_ATTEMPT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED
  } from '../actions/types';
  
  const INITIAL_STATE = {  loading: false, error: '', user:[], signedup: false }
  
  export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case SIGNUP_ATTEMPT:
        return {...INITIAL_STATE, loading: true }
      case SIGNUP_FAILED:
        return {...INITIAL_STATE, loading: false, error: action.error  }
      case SIGNUP_SUCCESS:
        return {...INITIAL_STATE, loading: false, signedup: true, user: action.user  }
      default:
        return state;
    }
  } 