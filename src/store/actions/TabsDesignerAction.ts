import TYPES from "../../types/store";

export const TabsDesignerAction = (param: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    dispatch({
      type: TYPES.TAB_NAME_TRIPDESIGNER,
      payload: param,
    });
  };
};