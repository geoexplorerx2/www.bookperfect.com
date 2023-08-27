import TYPES from "../../types/store";

// currency
export const currency = (currency: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.CURRENCY,
          payload: currency
        });
  };
};