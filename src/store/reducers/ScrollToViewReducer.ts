import TYPES from '../../types/store';
import {DISABLEDROPDOWN} from '../actions';

const initialState: any = {
    scrolltotarget: ''
};

export const ScrollToViewReducer = (state = initialState, action:any) => {
    switch(action.type){
        case TYPES.SCROLL_TO_TOP:
            return  action.payload 
        case TYPES.SCROLL_TO_TARGET:
           return {...state, scrolltotarget: action.payload }
        default:
            return state
    }
};