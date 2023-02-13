import {
  VERIFY_CODE,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAILED,

  
      } from '../actions/types';
      
      const INITIAL_STATE = { loading: false, error: '', code: false }
      
      export default (state = INITIAL_STATE, action) => {
        switch(action.type) {
          case VERIFY_CODE:
            return {...INITIAL_STATE, loading: true }
          case VERIFY_CODE_FAILED:
            return {...INITIAL_STATE, loading: false, error: action.error  }
          case VERIFY_CODE_SUCCESS:
            return {...INITIAL_STATE, loading: false, code: true  }
          default:
            return state;
        }
      }
    