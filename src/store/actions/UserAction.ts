import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

export const hasUserBeenHereBefore = (beenherebefore: boolean) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.HAS_USER_BEEN_HERE_BEFORE,
          payload: beenherebefore
        });
  };
};

export const hasUserBeenHereBeforeClear = () => {
    return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
          dispatch({
            type: TYPES.HAS_USER_BEEN_HERE_BEFORE_CLEAR,
            payload: ''
          });
    };
  };
  
