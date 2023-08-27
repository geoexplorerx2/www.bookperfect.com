import {PACKAGECOLOR} from '../actions';

const initialState:any = [{status:''}];

const packageColorActiveReducer = (state = initialState, action: any ) => {
    switch(action.type){
        case 'PACKAGECOLOR':
            return action.payload 
        default:
            return state
    }
};

export default packageColorActiveReducer;