
import {
    SEND_EMAIL,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED
    } from '../actions/types';
    
    const INITIAL_STATE = { loading: false, error: '', pass: false }
    
    export default (state = INITIAL_STATE, action) => {
      switch(action.type) {
        case SEND_EMAIL:
          return {...INITIAL_STATE, loading: true }
        case FORGET_PASSWORD_FAILED:
          return {...INITIAL_STATE, loading: false, error: action.error  }
        case FORGET_PASSWORD_SUCCESS:
          return {...INITIAL_STATE, loading: false, pass: true  }
        default:
          return state;
      }
    }
  