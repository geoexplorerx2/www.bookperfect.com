import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

// active support
export const supportHelps = (support: any) => {
  if(support.type == 'RESET' ){
    return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      dispatch({
        type: TYPES.RESET,
        payload: support
      });
   };
  }
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.SUPPORT_HELP,
          payload: support
        });
  };
};

// helps
export const helpsTypes = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getHelpsTypes()
      .then((data: { entity: any; }) => {
        console.log({data})
        dispatch({
          type: TYPES.HELPS_TYPES,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// helps
export const searchHelps = (search: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getSearchHelps(search)
      .then((data: { entity: any; }) => {
        console.log({data})
        dispatch({
          type: TYPES.SEARCH_HELPS,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// helps
export const activeSearchHelp = (search: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      dispatch({
        type: TYPES.ACTIVE_SEARCH_HELP,
        payload: search,
      });
  };
};