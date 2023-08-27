import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const initialState = {
  externalepcountries: ""
};

export const ExternalEPReducer = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
  switch (action.type) {
    case TYPES.ALL_EXTERNAL_COUNTRIES:
      // Logger.log( action.payload.data );
      return { ...state, externalepcountries: action.payload };
    default:
      return state;
  }
};
