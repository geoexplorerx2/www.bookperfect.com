import TYPES from "../../types/store";

// SEARCH_BTN_STATUS
export const SearchBtnStatus = (status: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    dispatch({
      type: TYPES.SEARCH_BTN_STATUS,
      payload: status
    });
  };
};
