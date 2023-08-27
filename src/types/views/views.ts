import { ComponentType } from "react";

export interface Locations {
  "/"?: {};
  "/404"?: {};
  "/activities"?: {};
  "/blog"?: {};
  "/flights"?: {};
  "/flights-hotels"?: {};
  "/hotels"?: {};
  "/packages"?: {};
  "/routing"?: {};
  "/transfers"?: {};
  "/travelguide"?: {};
  "/travelguide/europe"?: {};
  "/search/flights"?: {};
  "/search/hotels"?: {};
  "/search/flightshotels"?: {};
  "/avuxi"?: {};
  "/myprofile"?: {};
  "/travelguide/asia"?: {};
  "/travelguide/africa"?: {};
  "/travelguide/northamerica"?: {};
  "/travelguide/southamerica"?: {};
  "/travelguide/antarctica"?: {};
  "/travelguide/australia"?: {};
  "/support"?: {};
  "/tripdesigner"?: {};
  "/company"?: {};
  "/offers"?: {};
  "/commingsoon"?:{};
};

export type PathName = keyof Locations;

export interface Views {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
  type?: string;
};