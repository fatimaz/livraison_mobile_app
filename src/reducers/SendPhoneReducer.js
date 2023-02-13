
import {
  SEND_PHONE,
  SEND_PHONE_SUCCESS,
  SEND_PHONE_FAILED
    } from '../actions/types';
    
    const INITIAL_STATE = { loading: false, error: '', pass: false }
    
    export default (state = INITIAL_STATE, action) => {
      switch(action.type) {
        case SEND_PHONE:
          return {...INITIAL_STATE, loading: true }
        case SEND_PHONE_FAILED:
          return {...INITIAL_STATE, loading: false, error: action.error  }
        case SEND_PHONE_SUCCESS:
          return {...INITIAL_STATE, loading: false, pass: true  }
        default:
          return state;
      }
    }
  