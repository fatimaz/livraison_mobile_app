import {
    LOADING_VEHICLE,
    LOADING_VEHICLE_SUCCESS,
    LOADING_VEHICLE_FAILED,
} from '../actions/types';

const INITIAL_STATE = { loading: false, error: '', routes: [] }
  
export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOADING_VEHICLE:
      return { ...INITIAL_STATE, loading: true }
    case LOADING_VEHICLE_SUCCESS:
      return { ...INITIAL_STATE, loading: false, routes: action.routes}
    case LOADING_VEHICLE_FAILED:
      return { ...INITIAL_STATE, loading: false, error: action.error }
    default:
      return state;
  }
}