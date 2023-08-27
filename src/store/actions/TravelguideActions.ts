import services from "../../api/services";
import Logger from "../../common/Logger";
import TYPES from "../../types/store";

const server = services;

export const continent = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getContinent()
      .then((data: { entity: any; }) => {
        // console.log('continent', data);
        dispatch({
          type: TYPES.CONTINENT,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const countries = (continent_id: number) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getContinentCountries(continent_id)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.COUNTRIES,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// get cities by countries id
export const cities = (country_id: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getCountryCities(country_id)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.CITIES,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// clear cities
export const citiesClear = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    dispatch({
      type: TYPES.CITIES_CLEAR,
      payload: []
    });
  };
};

// get city data
export const cityInformationData = (city_id: string, currency: any = '', callback?: () => void) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getCityData(city_id, currency)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.CITY_DATA,
          payload: data.entity,
        });
       callback && callback()
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const guideDetailData = (guide_id: string, activeguide: any = '') => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      // .getGuideData(guide_id)
      .getDestinationDetail(guide_id)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.GUIDE_DETAIL,
          payload: {
            data: data.entity[0].field_info_subtopics,
            activeguide: activeguide,
            city: data.entity[0].name,
            geocode: data.entity[0].field_geolocation // TODO: get geocode from data object - from drupal
          }
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const guideDetailClear = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.GUIDE_DETAIL_CLEAR,
          payload: []
        });
  };
};

export const activeSearchGuide = (guide: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.ACTIVE_SEARCH_GUIDE,
          payload: guide
        });
  };
};

export const destinationDetail = (destination_id: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getDestinationDetail(destination_id)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.DESTINATION_DETAIL,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const tripIdeasData = (req: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getTripIdeas(req)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.TRIP_IDEA_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const airlinesResource = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getAirlinesResource()
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.AIRLINES_RESOURCE,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const destinationsResource = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getDestinationsResource()
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.DESTINATIONS_RESOURCE,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const informationsNode = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getInformationsNode()
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.INFORMATIONS_NODE,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const subtopicsTerm = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getSubtopicsTerm()
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.SUBTOPICS_TERM,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const helpTypesTerm = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getHelpTypesTerm()
      .then((data: { entity: any; }) => {
        // console.log({data});
        dispatch({
          type: TYPES.HELP_TYPES_TERM,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const helpArticles = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getHelpArticles()
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.HELP_ARTICLES,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const searchNode = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getSearchNode()
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.SEARCH_NODE,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

export const subtopicsParagraph = () => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getSubtopicsParagraph()
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.SUBTOPICS_PARAGRAPH,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// active taxonomy directive
export const taxonomyDir = (dir: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.TAXONOMYDIR_ACTIVE,
          payload: dir
        });
  };
};

export const taxonomyClear = (callback?: () => void) => {
  return async (dispatch: (arg0: { type: any; payload: any;}) => void) => {
        dispatch({
          type: TYPES.TAXONOMY_CLEAR,
          payload: []
        });
        callback && callback()
  };
};

export const taxonomyUpdate = (index: number) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.TAXONOMY_UPDATE,
          payload: index
        });
  };
};

// scroll to deals
export const popularDestView = (id: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
        dispatch({
          type: TYPES.POPULAR_DESTINATION_VIEW,
          payload: id
        });
  };
};

// seach destination
export const searchDestination = (query: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getSearchDestination(query)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.SEARCH_DESTINATION,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// faq
export const faqs = (nid: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getFAQS(nid)
      .then((data: { entity: any; }) => {
        // console.log({data})
        dispatch({
          type: TYPES.FAQS,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// get cities by countries id
export const discoverdestinations = (country_id: string) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getCountryCities(country_id)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.DISCOVER_DESTINATIONS,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};

// city weather data using geocode
export const cityWeatherData = (geocode: any) => {
  return async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    server
      .getCityWeatherData(geocode)
      .then((data: { entity: any; }) => {
        dispatch({
          type: TYPES.CITY_WEATHER_DATA,
          payload: data.entity,
        });
      })
      .catch((error: any) => {
        Logger.error(error);
      });
  };
};