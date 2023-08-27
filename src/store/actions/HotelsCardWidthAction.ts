import TYPES from "../../types/store";

// currency
export const HotelsCardWidthAction = (width: number) => {
  return (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.HOTELS_CARD_WIDTH,
          payload: width
        });
  };
};