import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const initialState = {
  feedback: ""
};

export const FeedbackReducer = (state = initialState, action: { type: any; payload: { data: any; }; }) => {
  switch (action.type) {
    case TYPES.FEEDBACK:
      // Logger.log( action.payload.data );
      return { ...state, feedback: action.payload };
    default:
      return state;
  }
};
