import {FIXLAYOUT} from '../actions/layoutcontroller';
import TYPES from "../../types/store";
const initialState:any = []
const layoutReducer = (state = initialState,action:any) => {
    switch(action.type){
        case 'FIXLAYOUT':
            return  action.payload
        case TYPES.TRAVELLERS:
            return action.payload 
        case TYPES.EXCLUSIVE_OFFERS_VIEW:
            return action.payload
        default:
            return state
    }
}
export default layoutReducer;