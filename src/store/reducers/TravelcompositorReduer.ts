import { Console } from "console";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const initialState = {
  tripideas: "",
  hotels: "",
  hotelinfo: "",
  transports: "",
  accomodations: [],
  alldestinations: "",
  departure: [],
  arrival: [],
  transfers: '',
  cityhotels: [],
  bookings: '',
  activities: '',
  usertripideashistory: '',
  citytripideas: [],
  citytransportsdata: [],
  cityactivitiesdata: [],
  citytransfersdata: [],
};

export const TravelcompositorReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case TYPES.TRIP_IDEA_DATA:
      // Logger.log( action.payload.data );
      return { ...state, tripideas: action.payload };

    case TYPES.HOTELS_DATA:
      // Logger.log( action.payload.data );
      return { ...state, hotels: action.payload };
    case TYPES.BY_PROVIDER_DATA:
      // Logger.log( action.payload.data );
      return { ...state, hotelinfo: action.payload };
    case TYPES.TRANSPORTS_DATA:
      // Logger.log( action.payload.data );
      return { ...state, transports: action.payload };
    case TYPES.ACCOMODATIONS_DATA:
    // Logger.log( action.payload.data );
      return { ...state, accomodations: [...state.accomodations, action.payload] };
    case TYPES.RESET_ACCOMODATIONS_DATA:
      return {...state, accomodations: action.payload }
    case TYPES.ALL_DESTINATION_DATA:
      // Logger.log( action.payload.data );
      return { ...state, alldestinations: action.payload };
    case TYPES.DEPARTURE_DATA:
      // Logger.log( action.payload.data );
      let deparExist = state.departure.find((dpr:any) => dpr.code == action.payload.code);
      if(!deparExist){
        return { ...state, departure: [...state.departure, action.payload] };
      } else return {...state, departure: [...state.departure ] };

    case TYPES.ARRIVAL_DATA:
      // Logger.log( action.payload.data );
      let arrExist = state.arrival.find((dpr:any) => dpr.code == action.payload.code);
      if(!arrExist){
        return { ...state, arrival: [...state.arrival, action.payload] };
      } else return { ...state, arrival: [...state.arrival ] };

    case TYPES.DEPARTURE_DATA_RESET:
      // Logger.log( action.payload.data );
      return { ...state, departure: action.payload };

    case TYPES.ARRIVAL_DATA_RESET:
      // Logger.log( action.payload.data );
      return { ...state, arrival: action.payload };

    case TYPES.TRANSFERS_DATA:
      // Logger.log( action.payload.data );
      return { ...state, transfers: action.payload };

    case TYPES.CITY_TRANSFERS_DATA:
      // Logger.log( action.payload.data );
      let transferExist = state.citytransfersdata.find((activity: any) => activity.id == action.payload.id);
      if(!transferExist){
        return { ...state, citytransfersdata: [...state.citytransfersdata, action.payload] };
      } else return { ...state, citytransfersdata: [...state.citytransfersdata ] };

    case TYPES.RESET_CITY_TRANSFERS_DATA:
      return { ...state, citytransfersdata: action.payload };

    case TYPES.CITY_HOTELS_DATA:
      // Logger.log( action.payload.data );
      return { ...state, cityhotels: action.payload};

    case TYPES.BOOKINGS_DATA:
      return { ...state, bookings: action.payload};

    case TYPES.ACTIVITIES_DATA:
      return {...state, activities: action.payload};

    case TYPES.CITY_ACTIVITIES_DATA:
      // Logger.log( action.payload.data );
      let activityExist = state.cityactivitiesdata.find((activity: any) => activity.code == action.payload.code);
      if(!activityExist){
        return { ...state, cityactivitiesdata: [...state.cityactivitiesdata, action.payload] };
      } else return { ...state, cityactivitiesdata: [...state.cityactivitiesdata ] };

    case TYPES.RESET_CITY_ACTIVITIES_DATA:
      return { ...state, cityactivitiesdata: action.payload };

    case TYPES.USER_TRIP_IDEAS_HISTORY:
      return { ...state, usertripideashistory: action.payload};

    case TYPES.TRIP_IDEA_DATA_BY_ID:
      // Logger.log( action.payload.data );
      return { ...state,  citytripideas: [...state.citytripideas, action.payload] };
      
    case TYPES.RESET_TRIP_IDEA_DATA_BY_ID:
      return { ...state, citytripideas: action.payload };

    case TYPES.TRANSPORTS_DATA_BY_ID:
     // Logger.log( action.payload.data );
     let citytransExist = state.citytransportsdata.find((dpr:any) => dpr.id == action.payload[0]?.id);
     if(!citytransExist){
       return { ...state, citytransportsdata: [...state.citytransportsdata, action.payload[0]] };
     } else return { ...state, citytransportsdata: [...state.citytransportsdata ] }

    case TYPES.RESET_TRANSPORTS_DATA_BY_ID:
      return { ...state, citytransportsdata: action.payload };

    default:
      return state;
  }
};
