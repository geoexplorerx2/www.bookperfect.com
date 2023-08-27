import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

// about
export const about = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getAbout()
      .then((data: { entity: any; }) => {
        // console.log({data})
        dispatch({
          type: TYPES.ABOUT,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// jobs
export const jobs = () => {
    return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      server
        .getJobs()
        .then((data: { entity: any; }) => {
          dispatch({
            type: TYPES.JOBS,
            payload: data.entity,
          });
        })
        .catch((error: any) => {
          Logger.error(error);
        });
    };
};

// company
export const company = (lang: any, callback: any = () => {}) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getCompany(lang)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.COMPANY,
          payload: data.entity,
        });
        callback();
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};