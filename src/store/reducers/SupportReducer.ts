import TYPES from "../../types/store";

const initialState = {
    support: [],
    helpstypes: '',
    searchhelps: '',
    activesearchhelp: ''
};

export const SupportReducer = (state = initialState, action: { type: any; payload: { tid: string; data: any; }; }) => {
  switch (action.type) {
    case TYPES.SUPPORT_HELP:
      // console.log(action.payload);
      if(action.payload.tid == '58'){
         return { ...state, support: [...state.support, action.payload]};
      } else return { ...state, support: state.support.length > 0 ? state.support.map((_support: any) => _support.tid != '58' && action.payload) : [...state.support, action.payload]};    
    case 'RESET': 
       return { support:[] }
    case TYPES.HELPS_TYPES:
       return {...state, helpstypes: action.payload};
    case TYPES.SEARCH_HELPS:
       return {...state, searchhelps: action.payload};
    case TYPES.ACTIVE_SEARCH_HELP:
       return {...state, activesearchhelp: action.payload};
    default:
      return state;
  }
};
