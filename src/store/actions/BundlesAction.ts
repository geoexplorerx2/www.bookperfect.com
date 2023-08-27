import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

// get cities by countries id
export const cityBundlesById = (bundle_id: string, currency: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getCityBundlesById(bundle_id, currency)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.CITIES_BUNDLES,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};