import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const initialState = {
  continent: "",
  countries: "",
  cities: "",
  citydata: "",
  airlines: "",
  destinations: "",
  informations: "",
  subtopicsterm: "",
  helptypes: "",
  helparticles: "",
  searchnode: "",
  subtopicsparagraph: "",
  taxonomydir: [],
  guidedetail: "",
  destinationdetail: "",
  populardestview: "",
  searchdestination: "",
  activesearchguide: "",
  faqs: "",
  discoverdestination: "",
  cityweatherdata: "",
};

export const TravelguideReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case TYPES.CONTINENT:
      // Logger.log( action.payload.data );
    return { ...state, continent: action.payload };

    case TYPES.COUNTRIES:
        // Logger.log( action.payload.data );
      return { ...state, countries: action.payload };

    case TYPES.CITIES:
      return { ...state, cities: action.payload };

    case TYPES.CITIES_CLEAR:
      return { ...state, cities: [] };

    case TYPES.CITY_DATA:
      // Logger.log( action.payload.data );
     return { ...state, citydata: action.payload };

    case TYPES.GUIDE_DETAIL:
      // Logger.log( action.payload.data );
     return { ...state, guidedetail: action.payload };

    case TYPES.GUIDE_DETAIL_CLEAR:
      // Logger.log( action.payload.data );
     return { ...state, guidedetail: '' };
     
    case TYPES.DESTINATION_DETAIL:
      // Logger.log( action.payload.data );
     return { ...state, destinationdetail: action.payload };

    case TYPES.AIRLINES_RESOURCE:
        Logger.log( action.payload.data );
      return { ...state, airlines: action.payload };

    case TYPES.DESTINATIONS_RESOURCE:
        // Logger.log( action.payload.data );
      return { ...state, destinations: action.payload };

    case TYPES.INFORMATIONS_NODE:
        // Logger.log( action.payload.data );
      return { ...state, informations: action.payload };

    case TYPES.SUBTOPICS_TERM:
        // Logger.log( action.payload.data );
      return { ...state, subtopicsterm: action.payload };

    case TYPES.HELP_TYPES_TERM:
        // Logger.log( action.payload.data );
      return { ...state, helptypes: action.payload };

    case TYPES.HELP_ARTICLES:
        // Logger.log( action.payload.data );
      return { ...state, helparticles: action.payload };

    case TYPES.SEARCH_NODE:
        // Logger.log( action.payload.data );
      return { ...state, searchnode: action.payload };

    case TYPES.SUBTOPICS_PARAGRAPH:
        // console.log( action );
      return { ...state, subtopicsparagraph: action.payload };

    case TYPES.TAXONOMYDIR_ACTIVE:
      // console.log('taxo dir..', state.taxonomydir)
      if(!state.taxonomydir) return { ...state, taxonomydir: [ action.payload ]}
      else return { ...state, taxonomydir: [...state.taxonomydir, action.payload]};

    case TYPES.TAXONOMY_CLEAR:
      return { ...state, taxonomydir: []};

    case TYPES.TAXONOMY_UPDATE:
      if(action.payload == 0) return {...state, taxonomydir: [state.taxonomydir[0]] };
      else return {...state, taxonomydir: state.taxonomydir.slice(0, action.payload + 1)};
    
    case TYPES.POPULAR_DESTINATION_VIEW:
      return { ...state, populardestview: action.payload };
    
    case TYPES.SEARCH_DESTINATION:
      return { ...state, searchdestination: action.payload };
    
    case TYPES.ACTIVE_SEARCH_GUIDE:
      return { ...state, activesearchguide: action.payload };

    case TYPES.FAQS:
      return { ...state, faqs: action.payload };

    case TYPES.DISCOVER_DESTINATIONS:
      return { ...state, discoverdestination: action.payload };

    case TYPES.CITY_WEATHER_DATA:
      return { ...state, cityweatherdata: action.payload };
    default:
      return state;
  }
};
