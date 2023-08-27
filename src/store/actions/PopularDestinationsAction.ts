import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

// get cities by countries id
export const popularcities = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getPopularCities()
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.POPULAR_CITIES_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};