import TYPES from "../../types/store";

const initialState = {
    hasuserbeenherebefore: '',
};

export const UserReducer = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
  switch (action.type) {
    case TYPES.HAS_USER_BEEN_HERE_BEFORE:
      return {...state, hasuserbeenherebefore: action.payload};
    case TYPES.HAS_USER_BEEN_HERE_BEFORE_CLEAR:
      return {...state, hasuserbeenherebefore: action.payload};
    default:
      return state;
  }
};
