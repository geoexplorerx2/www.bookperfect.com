import TYPES from "../../types/store";

const initialState = {
    about: '',
    jobs: ''
};

// company reducer
export const CompanyReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case TYPES.ABOUT:
            return {...state, about: action.payload};
        case TYPES.JOBS:
            // console.log({action})
            return {...state, jobs: action.payload};
        case TYPES.COMPANY:
            return {...state, company: action.payload};
        default:
            return state;
    }
};