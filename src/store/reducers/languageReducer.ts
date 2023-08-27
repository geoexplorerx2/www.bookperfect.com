import {LANGUAGE} from '../actions/';
const initialState:any = []
const LanguageReducer = (state = initialState,action:any) => {
    switch(action.type){
        case 'LANGUAGE':
            return  action.payload 
        default:
            return state
    }
}
export default LanguageReducer;