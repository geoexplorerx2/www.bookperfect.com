import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const initialState = {
    popularcities: ''
};

export const PopularDestinationsReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case TYPES.POPULAR_CITIES_DATA:
    return { ...state, popularcities: action.payload };

    default:
      return state;
  }
};
