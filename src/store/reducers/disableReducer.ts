import {DISABLEDROPDOWN} from '../actions/';
const initialState:any = []
const disableReducer = (state = initialState,action:any) => {
    switch(action.type){
        case 'DISABLEDROPDOWN':
            return  action.payload 
        default:
            return state
    }
}
export default disableReducer;