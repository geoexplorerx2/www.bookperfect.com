import { Views } from "../types/views/views";
import {
    Activities,
    Blog,
    Avuxi,
    Flights,
    FlightsHotels,
    Homepage,
    Hotels,
    Packages,
    Routing,
    SearchActivities,
    SearchFlights,
    SearchFlightsHotels,
    SearchHotels,
    SearchHotelsResults,
    SearchPackages,
    SearchRouting,
    SearchTransfers,
    Transfers,
    Travelguide,
    MyProfile,
    Support,
    SearchTripDesigners,
    Company,
    Offers,
    News,
    SearchCarRental,
} from "../views";
import Destinations from "../views/Travelguide/Destinations";
import CommingSoon from "../views/Homepage/CommingSoon";
import PrivacyPolicy from "../views/PrivacyPolicy/PrivacyPolicy";
const viewsUrls: any[] = [
    {
        path: "/",
        exact: true,
        component: Homepage,
        type: "public"
    },
    {
        path: "/:lang/",
        exact: true,
        component: Homepage,
        type: "public"
    },
    {
        path: "/:lang/activities",
        exact: true,
        component: SearchActivities,
        type: "public"
    },
    {
        path: "/:lang/blog",
        exact: true,
        component: Blog,
        type: "public"
    },
    {
        path: "/:lang/avuxi",
        exact: true,
        component: Avuxi,
        type: "public"
    },
    {
        path: "/:lang/tripdesigner",
        exact: true,
        component: SearchTripDesigners,
        type: "public"
    },
    {
        path: "/:lang/packages",
        exact: true,
        component: SearchPackages,
        type: "public"
    },
    {
        path: "/:lang/routing",
        exact: true,
        component: SearchRouting,
        type: "public"
    },
    {
        path: "/:lang/car-rental",
        exact: true,
        component: SearchCarRental,
        type: "public"
    },
    {
        path: "/:lang/transfers",
        exact: true,
        component: SearchTransfers
    },
    {
        path: "/:lang/travelguide",
        exact: true,
        component: Travelguide,
        type: "public"
    },

    // dynamic url om destinations
    {
        path: "/:lang/travelguide/:continent",
        exact: true,
        component: Destinations,
        type: "public"
    },
    {
        path: "/:lang/travelguide/:continent/:country/:country_id",
        exact: true,
        component: Destinations,
        type: "public"
    },
    {
        path: "/:lang/travelguide/:continent/:country/:country_id/:city/:city_id",
        exact: true,
        component: Destinations,
        type: "public"
    },
    {
        path: "/:lang/travelguide/:continent/:country/:country_id/:city/:city_id/:scrollId",
        exact: true,
        component: Destinations,
        type: "public"
    },
    {
        path: "/:lang/travelguide/:continent/:country/:country_id/:city/:city_id/travelguide",
        exact: true,
        component: Destinations,
        type: "public"
    },
    {
        path: "/:lang/travelguide/:continent/:country/:country_id/:city/:city_id/travelguide/:scrollId",
        exact: true,
        component: Destinations,
        type: "public"
    },

    // { 
    //     path: "/travelguide/europe",
    //     exact: true, 
    //     component: Destinations,
    //     type: "public" 
    // },
    // { 
    //     path: "/travelguide/asia",
    //     exact: true, 
    //     component: Destinations,
    //     type: "public"
    // },
    // { 
    //     path: "/travelguide/africa",
    //     exact: true, 
    //     component: Destinations,
    //     type: "public"
    // },
    // { 
    //     path: "/travelguide/northamerica",
    //     exact: true, 
    //     component: Destinations ,
    //     type: "public"
    // },
    // { 
    //     path: "/travelguide/southamerica",
    //     exact: true, 
    //     component: Destinations,
    //     type: "public" 
    // },
    // { 
    //     path: "/travelguide/antarctica",
    //     exact: true, 
    //     component: Destinations ,
    //     type: "public"
    // },
    // { 
    //     path: "/travelguide/australia",
    //     exact: true, 
    //     component: Destinations,
    //     type: "public" 
    // },
    {
        path: "/:lang/flights",
        exact: true,
        component: SearchFlights,
        type: "public"
    },
    {
        path: "/:lang/hotels",
        exact: true,
        component: SearchHotels,
        type: "public"
    },
    {
        path: "/:lang/flights-hotels",
        exact: true,
        component: SearchFlightsHotels,
        type: "public"
    },
    {
        path: "/:lang/support",
        exact: true,
        component: Support,
        type: "public"
    },
    {
        path: "/:lang/support/:section?",
        exact: true,
        component: Support,
        type: "public"
    },
    {
        path: "/:lang/company",
        exact: true,
        component: Company,
        type: "public"
    },
    {
        // path: "/offers/:promocode",
        path: "/:lang/offers",
        exact: true,
        component: Offers,
        type: "public"
    },
    {
        // path: "/offers/:promocode",
        path: "/:lang/travelnews",
        exact: true,
        component: News,
        type: "public"
    },
    // results
    {
        path: "/:lang/search/hotels",
        exact: true,
        component: SearchHotelsResults,
        type: "public"
    },

    // authenticated users
    {
        path: "/:lang/myprofile",
        exact: true,
        component: MyProfile,
        type: "private"
    },
    {
        path: "/:lang/commingsoon",
        exact: true,
        component: CommingSoon,
        type: "public"
    },
    {
        path: "/:lang/privacy-policy",
        exact: true,
        component: PrivacyPolicy,
        type: "public"
    },
    {
        path: "/:lang/terms-of-use",
        exact: true,
        component: PrivacyPolicy,
        type: "public"
    }
];

export default viewsUrls;