import TYPES from "../../types/store";

const initialState = {
    TabsName: "Turkey",
};

export const TabsTripdesignerReducer = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
    switch (action.type) {
        case TYPES.TAB_NAME_TRIPDESIGNER:
            return { ...state, TabsName: action.payload };
        default:
            return state;
    }
};