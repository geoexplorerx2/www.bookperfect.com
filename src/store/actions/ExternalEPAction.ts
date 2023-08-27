import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

export const allExternalCountries = () => {
    return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      server
        .getAllExternalEPCountries()
        .then((data: { entity: any; }) => {
          // console.log({data});
          dispatch({
            type: TYPES.ALL_EXTERNAL_COUNTRIES,
            payload: data.entity,
          });
        })
        .catch((error: any) => {
          Logger.error(error);
        });
    };
  };