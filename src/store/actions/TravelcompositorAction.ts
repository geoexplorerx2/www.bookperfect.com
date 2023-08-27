import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

export const tripIdeasData = (req: any, callback?: () =>  void) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTripIdeas(req)
      .then((data: { entity: any; }) => {
        // console.log(data.entity);
        dispatch({
          type: TYPES.TRIP_IDEA_DATA,
          payload: data.entity,
        });
        callback && callback()
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const tripIdeasDataById = (req: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTripIdeasById(req)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.TRIP_IDEA_DATA_BY_ID,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};


// reset city trip ideas data
export const resetTripIdeasDataById = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      dispatch({
        type: TYPES.RESET_TRIP_IDEA_DATA_BY_ID,
        payload: [],
      });
  };
};

export const hotelsData = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getHotels()
      .then((data: { entity: any; }) => {
        // console.log(data.entity);
        dispatch({
          type: TYPES.HOTELS_DATA,
          payload: data.entity.hotel,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const hotelByProvider = (provider: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getHotelByProvider(provider)
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.BY_PROVIDER_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const transportsData = (currency: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTransports(currency)
      .then((data: { entity: any; }) => {
        // console.log(data.entity);
        dispatch({
          type: TYPES.TRANSPORTS_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// transports data by id
export const transportsDataById = (req: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTransportById(req)
      .then((data: { entity: any; }) => {
        // console.log('transports ids ==> ', data.entity);
        dispatch({
          type: TYPES.TRANSPORTS_DATA_BY_ID,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// reset transports data by id 
export const resetTransportsDataById = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      dispatch({
        type: TYPES.RESET_TRANSPORTS_DATA_BY_ID,
        payload: [],
      });
  };
};
export const accomodationsData = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getAccomodations()
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.ACCOMODATIONS_DATA,
          payload: data.entity.hotel,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// get accomodation data by id
export const accomodationData = (accomodation_id: any, lang: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getAccomodationById(accomodation_id, lang)
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.ACCOMODATIONS_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// get accomodation data by id
export const resetAccomodationData = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    dispatch({
      type: TYPES.RESET_ACCOMODATIONS_DATA,
      payload: []
    });
  };
};

export const allDestinationData = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getAllDestination()
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.ALL_DESTINATION_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// departure
export const departureByCodeData = (city_code: any, callback: any = () => {}) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getDestinationByCode(city_code)
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.DEPARTURE_DATA,
          payload: data.entity,
        });
        callback();
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// arrival
export const arrivalByCodeData = (city_code: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getDestinationByCode(city_code)
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.ARRIVAL_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// departure reset
export const departureByCodeDataReset = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      dispatch({
        type: TYPES.DEPARTURE_DATA_RESET,
        payload: [],
      });
  };
};

// arrival reset
export const arrivalByCodeDataReset = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
      dispatch({
        type: TYPES.ARRIVAL_DATA_RESET,
        payload: [],
      });
  };
};

// transfers
export const transfersData = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTransfer()
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.TRANSFERS_DATA,
          payload: data.entity.transfer,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// transfers by id
export const transfersDataById = (req: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTransferById(req)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.CITY_TRANSFERS_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// reset city transfers data
export const resetTransfersDataById = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.RESET_CITY_TRANSFERS_DATA,
          payload: [],
        });
  };
};

// hotels by city
export const hotelsbyCityData = (city: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getHotelsByCity(city)
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.CITY_HOTELS_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// bookings data
export const getBookingsData = (startdate: any, enddate: any, lang: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getBookings(startdate, enddate, lang)
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.BOOKINGS_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// bookings data
export const getActivitiesData = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getActivities()
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.ACTIVITIES_DATA,
          payload: data.entity.ticket,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// bookings data
export const activitiesDataById = (req: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getActivitiesById(req)
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.CITY_ACTIVITIES_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// reset activities data
export const resetActivitiesDataById = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    dispatch({
      type: TYPES.RESET_CITY_ACTIVITIES_DATA,
      payload: [],
    });
  };
};

// bookings data
export const getUserTripIdeasHistory = (username: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTripIdeasHistory(username)
      .then((data: { entity: any; }) => {
        // console.log(data);
        dispatch({
          type: TYPES.USER_TRIP_IDEAS_HISTORY,
          payload: data.entity.idea,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};