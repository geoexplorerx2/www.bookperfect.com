import TYPES from "../../types/store";

export const changeIcon = (active_tab: string) => {
    return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
            type: TYPES.CHANGEICON,
            payload: active_tab,
        });
    };
};