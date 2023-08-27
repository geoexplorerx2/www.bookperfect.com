import {MULTISTOP} from '../actions';

const initialState:any = [];

const multiStopReducer = (state = initialState, action: any ) => {
    switch(action.type){
        case 'MULTISTOP':
            return action.payload 
        default:
            return state
    }
};

export default multiStopReducer;