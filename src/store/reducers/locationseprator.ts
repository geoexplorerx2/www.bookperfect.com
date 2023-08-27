import {LOCATIONIDENTIFICATION} from '../actions';

const initialState:any = [{status:null,id:'from'}];

const locationsep = (state = initialState, action: any ) => {
    switch(action.type){
        case 'LOCATIONIDENTIFICATION':
            return action.payload 
        default:
            return state
    }
};

export default locationsep;