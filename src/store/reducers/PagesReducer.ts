import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const initialState = {
    landingpageinfo: '',
    staticpagetext: ''
};

export const PagesReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case TYPES.LANDING_PAGE_INFO:
      return { ...state, landingpageinfo: action.payload };
    case TYPES.STATIC_PAGE_TEXT:
      return { ...state, staticpagetext: action.payload };
    default:
      return state;
  }
};
