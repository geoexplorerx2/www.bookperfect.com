import Homepage from './Homepage/Homepage';
import ErrorPage from './404/index'
import Activities from './Activities/Activities';
import Blog from './Blog/Blog';
import Flights from './Flights/Flights';
import FlightsHotels from './FlightsHotels/FlightsHotels';
import Hotels from './Hotels/Hotels';
import Packages from './Packages/Packages';
import Routing from './Routing/Routing';
import Transfers from './Transfers/Transfers';
import Travelguide from './Travelguide/Travelguide';

import SearchFlights from './Flights/SearchFlights';
import SearchHotels from './Hotels/SearchHotels';
import SearchFlightsHotels from './FlightsHotels/SearchFlightsHotels';
import SearchPackages from './Packages/SearchPackages';
import SearchRouting from './Routing/SearchRouting';
import SearchTransfers from './Transfers/SearchTransfers';
import SearchActivities from './Activities/SearchActivities';

import SearchHotelsResults from './Hotels/SearchHotelsResults';
import Avuxi from './Avuxi/Avuxi';
import SearchTripDesigners from './TripDesigners/SearchTripDesigners';

import MyProfile from './Profile/MyProfile';
import Support from './Helps/Support';
import Company from './Company/Company';
import Offers from './Offers/Offers';

import SearchCarRental from './CarRental/SearchCarRental';

import News from './News/News';

export {
    Homepage,
    ErrorPage,
    Activities,
    Blog,
    Flights,
    FlightsHotels,
    Hotels,
    Packages,
    Routing,
    Transfers,
    Travelguide,
    Avuxi,

    // search
    SearchFlights,
    SearchHotels,
    SearchFlightsHotels,
    SearchPackages,
    SearchRouting,
    SearchTransfers,
    SearchActivities,
    SearchTripDesigners,
    SearchCarRental,
    
    // results
    SearchHotelsResults,

    // authenticated
    MyProfile,

    // helps
    Support,

    // company
    Company,
    
    // offers
    Offers,

    // news
    News
};

// export { Homepage as default } from './Homepage/Homepage'