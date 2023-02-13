import {
    PHOTO_SUCCESS,
    PHOTO_FAILED,
    ADDING_PHOTO
  } from '../actions/types';
  
  const INITIAL_STATE = { loading: false, error: '', saved: false  }
  
  export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
      case ADDING_PHOTO:
        return { ...INITIAL_STATE, loading: true }
      case PHOTO_SUCCESS:
        return { ...INITIAL_STATE, loading: false, saved: true }
      case PHOTO_FAILED:
        return { ...INITIAL_STATE, loading: false, error: action.error }
      default:
        return state;
    }
  }