import { combineReducers } from "redux";
// import { combineReducers  } from '@reduxjs/toolkit';
import { connectRouter } from "connected-react-router";

import history from '../history';

import { TravelguideReducer } from './TravelguideReducer';
import { SigninReducer } from "./SigninReducer";
import LayoutReducer from "./layoutReducer";
import LightMode from './lightmodeReducer';
import { SupportReducer } from './SupportReducer';
import { CurrencyReducer } from './CurrencyReducer';
import MultiStopReducer from './multistopReducer';
import LocationIdReducer from "./LocationIdReducer";
import { TravelcompositorReducer } from "./TravelcompositorReduer";
import CurrencyTab from "./CurrencyTabReducer";
import LanguageReducer from './languageReducer';
import { LanguagesReducer } from "./LanguagesReducer";
import packageColorActiveReducer from './packageColorActiveReducer';
import disableReducer from "./disableReducer";
import locationsep from './locationseprator';
import locationdestination from './location_destination';
import { ExternalEPReducer } from "./ExternalEPReducer";
import DynamicStyles from "./DynamicStylesReducer";
import { CompanyReducer } from "./CompanyReducer";
import { ExclusiveOffersReducer } from "./ExclusiveOffersReducer";
import { PopularDestinationsReducer } from "./PopularDestinationsReducer";
import { TravelNewsReducer } from "./TravelNewsReducer";
import { UserReducer } from "./UserReducer";
import { PagesReducer } from "./PagesReducer";
import { BundlesReducer } from "./BundlesReducer";
import TravellersReducer from './TravellersReducer';
import { ScrollToViewReducer } from './ScrollToViewReducer';
import CitiesReducer from './CitiesReducer';
import { ChangeIcon } from "./ChangeIcon";
import NotificationSlice from "./NotificationReducer";
import { SearchBtnReducer } from "./SearchBtnReducer";
// import { TabsTripdesignerReducer } from "./TabsTripdesignerReducer";
import { FeedbackReducer } from "./FeedbackReducer";

const rootReducer = combineReducers({
  router: connectRouter(history),
  TravelguideReducer,
  SigninReducer,
  LayoutReducer,
  LightMode,
  SupportReducer,
  CurrencyReducer,
  MultiStopReducer,
  LocationIdReducer,
  TravelcompositorReducer,
  CurrencyTab,
  LanguageReducer,
  LanguagesReducer,
  packageColorActiveReducer,
  disableReducer,
  locationsep,
  locationdestination,
  ExternalEPReducer,
  DynamicStyles,
  CompanyReducer,
  ExclusiveOffersReducer,
  PopularDestinationsReducer,
  TravelNewsReducer,
  UserReducer,
  PagesReducer,
  BundlesReducer,
  ScrollToViewReducer,
  TravellersReducer,
  CitiesReducer,
  ChangeIcon,
  NotificationSlice,
  SearchBtnReducer,
  // TabsTripdesignerReducer,
  FeedbackReducer
});

/**
 * reducers combine here
 * @param {*} state 
 * @param {*} action 
 * @returns root reducers
 */
const appReducer = (state: any, action: { type: string; }) => {
  //   if (action.type === "") {
  //     return rootReducer(undefined, action); // clean store for a specific action type
  //   }

  return rootReducer(state, action);
};

export default appReducer;
export type RootState = ReturnType<typeof rootReducer>