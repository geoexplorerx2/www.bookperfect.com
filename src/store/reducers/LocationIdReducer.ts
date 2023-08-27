import {LOCATIONID} from '../actions';

const initialState: any = {status:'Empty'};

const LocationIdReducer = (state = initialState, action: any ) => {
    switch(action.type){
        case 'LOCATIONID':
            return action.payload 
        default:
            return state
    }
};

export default LocationIdReducer;