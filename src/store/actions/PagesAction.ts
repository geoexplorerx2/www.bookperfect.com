import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

export const landingPageInfo = (page_id: any) => {
    return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      server
        .getLandingPageInfoById(page_id)
        .then((data: { entity: any; }) => {
          dispatch({
            type: TYPES.LANDING_PAGE_INFO,
            payload: data.entity,
          });
        })
        .catch((error: any) => {
          Logger.error(error);
        });
    };
};

export const staticPageText = (pageId: string, lang: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getStaticPageText(pageId, lang)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.STATIC_PAGE_TEXT,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};
