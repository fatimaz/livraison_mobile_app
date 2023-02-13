import {
    REPORT_FAILED,
    ADDING_REPORT,
    REPORT_SUCCESS,
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', savedreport: false }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case ADDING_REPORT:
        return { ...INITIAL_STATE, loading: true }
      case REPORT_SUCCESS:
        return { ...INITIAL_STATE, loading: false, savedreport: true }
      case REPORT_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }