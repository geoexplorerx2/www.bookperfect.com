import TYPES from "../../types/store";

const initialState = {
    travelnews: '',
    travelnewsdetails: ''
};

export const TravelNewsReducer = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
  switch (action.type) {
    case TYPES.TRAVEL_NEWS_DATA:
      return {...state, travelnews: action.payload};
    case TYPES.TRAVEL_NEWS_DETAIL_DATA:
      return {...state, travelnewsdetails: action.payload};
    case TYPES.TRAVEL_NEWS_DETAIL_CLEAR:
      return {...state, travelnewsdetails: action.payload};
    default:
      return state;
  }
};
