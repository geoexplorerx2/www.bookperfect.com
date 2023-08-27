import TYPES from "../../types/store";

// language
export const language = (lang: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.LANGUAGE,
          payload: lang
        });
  };
};