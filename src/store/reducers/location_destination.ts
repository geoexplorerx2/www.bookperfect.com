import {LOCATIONIDENTIFICATION_DESTINATION} from '../actions';

const initialState:any = [];

const LOCATION_DESTINATION = (state = initialState, action: any ) => {
    switch(action.type){
        case 'LOCATIONIDENTIFICATION_DESTINATION':
            return action.payload 
        default:
            return state
    }
};

export default LOCATION_DESTINATION;