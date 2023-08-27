import TYPES from '../../types/store';
const initialState: any = {
    result: false,
};

export const SearchBtnReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TYPES.SEARCH_BTN_STATUS:
            return {...state, result: action.payload };
        default:
            return state
    }
};