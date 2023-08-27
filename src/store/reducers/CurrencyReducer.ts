import TYPES from "../../types/store";

const initialState = {
    currency: 'EUR'
};

// signin reducer
export const CurrencyReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case TYPES.CURRENCY:
            return {...state, currency: action.payload};
        default:
            return state;
    }
};