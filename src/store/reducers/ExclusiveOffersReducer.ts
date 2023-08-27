import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const initialState = {
  exclusiveoffers: "",
  offerdetail: "",
  activeofferssearchtab: "",
};

export const ExclusiveOffersReducer = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
  switch (action.type) {
    case TYPES.EXCLUSIVE_OFFERS:
      return { ...state, exclusiveoffers: action.payload };
    case TYPES.OFFER_DETAIL:
      // console.log(action.payload)
      return { ...state, offerdetail: action.payload };
    case TYPES.RESET_OFFER_DETAIL:
      // console.log(action.payload)
      return { ...state, offerdetail: action.payload };
    case TYPES.ACTIVE_OFFERS_SEARCH_TAB:
      return { ...state, activeofferssearchtab: action.payload }
    default:
      return state;
  }
};
