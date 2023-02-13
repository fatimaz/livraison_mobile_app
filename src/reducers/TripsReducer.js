import {
    ADDING_TRIP_FAILED,
    ADDING_TRIP,
    ADDING_TRIP_SUCCESS,
    LOADING_TRIP,
    LOADING_TRIP_SUCCESS,
    LOADING_TRIP_FAILED
} from '../actions/types';

const INITIAL_STATE = { loading: false, error: '', added: false, fetching: false, data: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADDING_TRIP: 
            return { ...state, loading: true };
        case ADDING_TRIP_SUCCESS: 
            return { ...state, loading: false, added: true };
        case ADDING_TRIP_FAILED:
            return { ...state, loading: false, added: false, error: action.payload };
        case LOADING_TRIP:
            return { ...state, fetching: true };
        case LOADING_TRIP_SUCCESS: 
            return { ...state, fetching: false, trips: action.trips };
       case LOADING_TRIP_FAILED:
           return { ...state, fetching: false, error: action.error }
        default:
            return state;
    }
};