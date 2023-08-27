import TYPES from "../../types/store";
const initialState = { tabName: "", };
export const ChangeIcon = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
    switch (action.type) {
        case TYPES.CHANGEICON:
            return { ...state, tabName: action.payload };
        default:
            return state;
    }
};

