import TYPES from "../../types/store";

const initialState = {
    citiesbundles: '',
};

export const BundlesReducer = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
  switch (action.type) {
    case TYPES.CITIES_BUNDLES:
      return {...state, citiesbundles: action.payload};
    default:
      return state;
  }
};
