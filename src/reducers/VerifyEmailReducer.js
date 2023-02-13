
import {
    VERIFY_EMAIL,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILED,
      } from '../actions/types';
      
      const INITIAL_STATE = { loading: false, error: '', pass: false }
      
      export default (state = INITIAL_STATE, action) => {
        switch(action.type) {
          case VERIFY_EMAIL:
            return {...INITIAL_STATE, loading: true }
          case VERIFY_EMAIL_FAILED:
            return {...INITIAL_STATE, loading: false, error: action.error  }
          case VERIFY_EMAIL_SUCCESS:
            return {...INITIAL_STATE, loading: false, pass: true  }
          default:
            return state;
        }
      }
    