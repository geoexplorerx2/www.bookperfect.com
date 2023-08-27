import TYPES from "../../types/store";

// currency
export const scrollToTopAction = (scroll: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.SCROLL_TO_TOP,
          payload: scroll
        });
  };
};

// scroll to target
export const scrollToTargetAction = (id: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.SCROLL_TO_TARGET,
          payload: id
        });
  };
};