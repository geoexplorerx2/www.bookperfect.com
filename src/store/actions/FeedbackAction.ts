import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

export const feedback = (data: any, cb: Function) => {
    return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      server
        .sendFeedback(data)
        .then((data: { entity: any; }) => {
          dispatch({
            type: TYPES.FEEDBACK,
            payload: data.entity,
          });
          cb(data.entity);
        })
        .catch((error: any) => {
          Logger.error(error);
        });
    };
  };