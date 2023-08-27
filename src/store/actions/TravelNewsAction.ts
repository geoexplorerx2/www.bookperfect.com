import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

export const travelnews = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTravelNews()
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.TRAVEL_NEWS_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// get travel news details
export const travelnewsdetails = (travel_news_id: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTravelNewsById(travel_news_id)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.TRAVEL_NEWS_DETAIL_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const travelNewsDetailsClear = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.TRAVEL_NEWS_DETAIL_CLEAR,
          payload: ''
        });
  };
};
