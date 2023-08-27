import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

// eclusive offers
export const exclusiveOffers = () => {
    return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      server
        .getExclusiveOffers()
        .then((data: { entity: any; }) => {
          dispatch({
            type: TYPES.EXCLUSIVE_OFFERS,
            payload: data.entity,
          });
        })
        .catch((error: any) => {
          Logger.error(error);
        });
    };
};

// exclusive offer deatil
export const offerDetail = (offer_id: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getOfferById(offer_id)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.OFFER_DETAIL,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// reset exclusive offer deatil
export const resetOffersDetail = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      dispatch({
        type: TYPES.RESET_OFFER_DETAIL,
        payload: [],
      });
  };
};

// active offers search tab: 
export const activeOffersSearchTab = (active_tab: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      dispatch({
        type: TYPES.ACTIVE_OFFERS_SEARCH_TAB,
        payload: active_tab,
      });
  };
};