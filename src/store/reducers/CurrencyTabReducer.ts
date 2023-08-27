import {CURRENCY} from '../actions';

const initialState:any = [];

const CurrencyTab = (state = initialState, action: any ) => {
    switch(action.type){
        case 'CURRENCY':
            return action.payload 
        default:
            return state
    }
};

export default CurrencyTab;