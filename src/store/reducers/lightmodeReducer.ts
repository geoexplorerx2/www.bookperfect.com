import {LIGHTMODE} from '../actions';

const initialState: any = [];

const lightmodeReducer = (state = initialState, action: any ) => {
    switch(action.type){
        case 'LIGHTMODE':
            return action.payload 
        default:
            return state
    }
};

export default lightmodeReducer;