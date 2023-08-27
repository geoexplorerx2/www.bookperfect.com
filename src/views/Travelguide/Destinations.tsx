import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Logger from '../../common/Logger';
import { BrowserProperty, CheapestFlights, Information, SectionBackground, TopInternationalDestinations, TravelBlog, TripIdeas } from '../../components';
import HeroHead from '../../components/HeroHeader/HeroHead';
import FlightsHotelsSearchForm from '../../components/HeroInputSearch/FlightsHotelsSearchForm';
import Heading from '../../lib/Heading/Heading';
import {
  airlinesResource,
  cities,
  cityInformationData,
  countries,
  destinationDetail,
  destinationsResource,
  discoverdestinations,
  guideDetailData,
  helpArticles,
  helpTypesTerm,
  informationsNode,
  searchNode,
  subtopicsParagraph,
  subtopicsTerm,
  taxonomyClear,
  taxonomyDir,
  taxonomyUpdate
} from '../../store/actions/TravelguideActions';
import { DEMO_CATS, DEMO_CATS_1 } from '../Homepage/Homepage';

import image from '../../images/airline.png';
import guideimage from '../../images/guide.png';

import BrowserDestinations from '../../components/TopInterDestinations/BrowserDestinations';
import FlightSearchForm from '../../components/HeroInputSearch/FlightSearchForm';
import Loader from '../../components/Loader/Loader';
import CityGuide from './CityGuide';
import Guide from './Guide';
import { capitalizeFirstLetter } from '../../common/capitalizeFirstLetter';
import DestinationDetail from './DestinationDetail';
import { goToPage } from '../../common/goToPage';
import { accomodationData, activitiesDataById, arrivalByCodeData, departureByCodeData, popularcities, resetAccomodationData, resetActivitiesDataById, resetTransfersDataById, resetTransportsDataById, resetTripIdeasDataById, scrollToTargetAction, staticPageText, transfersDataById, transportsData, transportsDataById, tripIdeasDataById } from '../../store/actions';
import { Map } from 'tabler-icons-react';
import { useHistory, useParams } from 'react-router-dom';
import HomepageHeroSearch from '../../components/HeroInputSearch/HomepageHeroSearch';
import Popular from '../../components/Popular/Popular';
import { PopularData } from '../../data/PopularData';
import popularparisImg from '../../images/popularparisImg.svg';
import ShortCutRouting from '../../components/ShortcutRouting/ShortrcutRouting';
import { PopularDealsData } from '../../data/ProductDealsData';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import BASE_URL_HOME, { BASE_URL, MAILCHIMP_API_URL } from '../../api/env';
import Membership from '../../components/membership/membership';
import { GENERAL_TRAVELGUIDE_PAGE_ID } from '../../constants/pages';
import CarRental from '../../components/CarRental/CarRental';
import TopSearchResult from '../../components/SearchTop/TopSearchResult';
import PopularAirports from '../../components/PopularAirport/PopularAirport';
import useWindowSize from '../../hooks/useWindowSize';

import novaplaza from '../../images/novaplaza.png';
import { useTranslation } from 'react-i18next';

interface DestinationsProp {
  match?: any;
};

const Destinations: FC<DestinationsProp> = ({ match }) => {

  const dispatch = useDispatch();
  const airlinesData = useSelector((state: { airlines: object; }) => state.airlines);
  const destinationsData = useSelector((state: { destinations: object; }) => state.destinations);
  const informationsData = useSelector((state: { informations: object; }) => state.informations);
  const subtopicstermData = useSelector((state: { subtopicsterm: object; }) => state.subtopicsterm);
  const helptypesData = useSelector((state: { helptypes: object; }) => state.helptypes);
  const helparticlesData = useSelector((state: { helparticles: object; }) => state.helparticles);
  const searchnodeData = useSelector((state: { searchnode: object; }) => state.searchnode);
  const subtopicsparagraphData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.subtopicsparagraph);

  const taxonomyData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.taxonomydir);
  const countriesData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.countries);
  const cityData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.citydata);
  const destinationDetailData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.destinationdetail);
  const transports: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.transports);
  const guideDetail = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.guidedetail);
  const populardestview = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.populardestview);
  const activesearchguide = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.activesearchguide);
  const citiesData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.cities);
  const discoverDestination = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.discoverdestination);
  const departure: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.departure);
  const arrival: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.arrival);
  const citytripideas: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.citytripideas);
  const citytransportsdata: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.citytransportsdata);
  const cityactivitiesdata: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.cityactivitiesdata);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const staticpagetext = useSelector((state: { PagesReducer: any; }) => state.PagesReducer.staticpagetext);

  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const scrolltotarget = useSelector((state: { ScrollToViewReducer: any; }) => state.ScrollToViewReducer.scrolltotarget);
  const accomodations: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.accomodations);
  const citytransfersdata: any = useSelector((state: { TravelcompositorReducer: any; }) => state.TravelcompositorReducer.citytransfersdata);
  const hotelsCardWidth = useSelector((state: any) => state.DynamicStyles.hotelsCardWidth)
  const hotelsSearchFormHeight = useSelector((state: any) => state.DynamicStyles?.hotelsFormHeight);
  const transfersSearchFormHeight = useSelector((state: any) => state.DynamicStyles?.transfersSearchFormHeight);
  const flightSearchFormHeight = useSelector((state: any) => state.DynamicStyles.flightsFormHeight)
  // @ts-ignore
  const { t } = useTranslation()


  const taxoLength = taxonomyData && taxonomyData.length > 0 && Array.from(new Set(taxonomyData)).length;
  const taxonomyLink = window.location.pathname.split('/');
  const taxonomy = taxonomyLink.slice(2, taxonomyLink.length);
  // console.log('the taxonomu: ', taxonomy)
  let customTaxonomyData: any = [];
  let history = useHistory();
  const yOffset = -90;

  localStorage.setItem('taxonomy', JSON.stringify(taxonomy));

  const [tripIdea, setTripIdea] = useState<any>({
    name: '',
    city: '',
    tid: ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const [activeGuide, setActiveGuide] = useState<any>({ guide: '' });
  const [flightsReady, setFlightsReady] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true)
  const [calculatedSpace, setCalculatedSpace] = useState(0);
  const windowSize = useWindowSize();
  const [currentTab, setCurrentTab] = useState({
    tabName: "Trip Designer",
    tabIcon: <Map size={23} />
  });
  useEffect(() => {

    const activeTabHeight = hotelsSearchFormHeight > 0 ?
    hotelsSearchFormHeight - 130 : transfersSearchFormHeight > 0 ?
      transfersSearchFormHeight - 180 : flightSearchFormHeight > 0 ? flightSearchFormHeight - 110 : 0

    if (isMobile) return
    
    setCalculatedSpace(activeTabHeight)
  }, [hotelsSearchFormHeight, transfersSearchFormHeight, flightSearchFormHeight]);




  // TODO: get these from drupal
  const PROMOTING_SPECIAL_PRODUCT_BANNER_BY_CITY = ['1092'];
  const CURRENT_CITY_TID = cityData && cityData[0].tid;

  // determine if we are on the mobile

  useEffect(() => {
    setIsMobile((prevState) => {
      if (!prevState && windowSize.width < 768) {
        return true
      } else if (prevState && windowSize.width > 768) {
        return false
      } else {
        return prevState
      }
    })
  },
    [windowSize])


  const params = useParams()
  const { continent, country, country_id, city, scrollId, city_id } = params
  let isContinentPage = !continent && country
  let isCountryPage = continent && !country_id
  let lastThreeParamsInTheURL = taxonomyLink.slice(-3)
  let isTravelguidePage = continent && city_id && lastThreeParamsInTheURL.includes('travelguide')
  let isCityPage = !!continent && !!country && !city_id && !isTravelguidePage
  let isDealsPage = !!continent && !!country && !!city_id && !isTravelguidePage

  
useEffect(() => {
  // const dynamicUrl = "/travelguide/" + taxonomy[0].name.toLowerCase() + "/" + taxonomy[1].name.toLowerCase() + "/" + taxonomy[1].tid + "/" + taxonomy[2].name.toLowerCase() +  "/" + taxonomy[2].tid + '/travelguide/' + guide.id;
  const currentUrl = '/travelguide/' + continent + '/' + country + '/' + country_id + '/' + city + '/' + city_id ;
  if(city_id && !scrollId) {
    // history.push(currentUrl)
  // history.goBack()
  // const {replace} = history
  // replace(currentUrl)
   }
},[params])


  useEffect(() => {
    if (activeGuide.guide == '' &&
       (!scrolltotarget || scrolltotarget == '')
       ) {
      setActiveGuide({
        guide: (
          guideDetail && guideDetail.activeguide ?
            guideDetail.activeguide.title : (
              (guideDetail && guideDetail.data && guideDetail.data[0].title) ?? ''))
      });
    } else if(scrolltotarget){
      setActiveGuide({
        guide: (
          guideDetail && guideDetail.activeguide ?
            guideDetail.activeguide?.title : (
              (guideDetail && guideDetail.data && guideDetail.data.filter((guide: any, index: number) => guide.id == scrolltotarget)[0]?.title) ?? ''))
        });
    }
  }, [guideDetail]);

  // get travelguide resources
  useEffect(() => {

    for (let i = 0; i < taxonomy.length; i++) {
      const dest = taxonomy[i];
      if (taxonomyData.indexOf(dest) > -1) return;
    }

    // get static text data
    dispatch(
      staticPageText(
        GENERAL_TRAVELGUIDE_PAGE_ID, 
        activeLang
      )
    );

    // reset limit flight ready limit to default
    // setFlightsReady(0);
  }, []);

  // reset all data
  useEffect(() => {
    if(accomodations.length > 0){
      dispatch(
        resetAccomodationData()
      );
    }
  }, []);

  useEffect(() => {
    if(citytransportsdata.length > 0){
      dispatch(
        resetTransportsDataById()
      );
    }
  }, []);
  
  useEffect(() => {
    if(cityactivitiesdata.length > 0){
      dispatch(
        resetActivitiesDataById()
      )
    }
  }, []);

  useEffect(() => {
    if(citytransfersdata.length > 0){
      dispatch(
        resetTransfersDataById()
      )
    }
  }, []);

  useEffect(() => {
    if(citytripideas.length > 0){
      dispatch(
        resetTripIdeasDataById()
      );
    }
  }, []);
  
  // console.log('city data ===>', {cityData});

  // TODO: get the continent id thought url param
  // useEffect(() => {
  // window.onload = (event) => {

  let continent_id: any = null;
  if (taxonomy[1] == 'europe') continent_id = 1075;
  if (taxonomy[1] == 'asia') continent_id = 1073;
  if (taxonomy[1] == 'oceania') continent_id = 1074;
  if (taxonomy[1] == 'africa') continent_id = 1072;
  if (taxonomy[1] == 'northamerica') continent_id = 1076;
  if (taxonomy[1] == 'southamerica') continent_id = 1077;
  if (taxonomy[1] == 'antarctica') continent_id = 33930;

  if (match.params.continent == 'europe') continent_id = 1075;
  if (match.params.continent == 'asia') continent_id = 1073;
  if (match.params.continent == 'oceania') continent_id = 1074;
  if (match.params.continent == 'africa') continent_id = 1072;
  if (match.params.continent == 'northamerica') continent_id = 1076;
  if (match.params.continent == 'southamerica') continent_id = 1077;
  if (match.params.continent == 'antarctica') continent_id = 33930;

  // dynamic taxo

  taxonomyLink?.splice(0, 2);

  let dynamicTaxo: any = [];
  if ([1,2].includes(taxonomyLink.length) ) {
    dynamicTaxo = [
      {
        name: match.params.continent,
        tid: continent_id
      }
    ];
  };

  if ([3,4].includes(taxonomyLink.length)) {
    dynamicTaxo = [
      {
        name: match.params.continent,
        tid: continent_id
      },
      {
        name: match.params.country,
        tid: match.params.country_id
      }
    ];
  };
  if ((taxonomyLink.length == 6 && taxonomyLink[taxonomyLink.length - 1] != 'travelguide') || taxonomyLink.length == 5) {
    dynamicTaxo = [
      {
        name: match.params.continent,
        tid: continent_id
      },
      {
        name: match.params.country,
        tid: match.params.country_id
      },
      {
        name: match.params.city,
        tid: match.params.city_id
      }
    ];
  };

  if (taxonomyLink[taxonomyLink.length - 1] == 'travelguide' || taxonomyLink.length == 7) {
    dynamicTaxo = [
      {
        name: match.params.continent,
        tid: continent_id
      },
      {
        name: match.params.country,
        tid: match.params.country_id
      },
      {
        name: match.params.city,
        tid: match.params.city_id
      },
      // {
      //   name: 'Travel Guide',
      //   tid: ''
      // }
    ];
  };

  useEffect(() => {
    let i = 1; 
    if (
      (
        (taxonomyData && taxonomyData.length == 0) || 
        [1, 2, 3, 4 ].includes(taxonomyLink?.length)
      ) && 
      continent_id
      ){
        if(!countriesData || countriesData == ''){

          dispatch(
            countries(
              continent_id
            )
          );
        }
  
      // get popular cities
      if(!popularcitiesdata){
        dispatch(
          popularcities()
        );
      }
    };
  
    if (taxonomyLink.length == 4) {
      if (citiesData && citiesData.length == 0) {
        // dispatch(
        //   countries(
        //     continent_id
        //   )
        // );
  
        dispatch(
          cities(
            taxonomyLink[3]
          )
        );
      };
  
      if (discoverDestination == '') {
        dispatch(
          discoverdestinations(
            taxonomyLink[3]
          )
        );
      };
    };
    if ( !cityData  && taxonomyLink.length == 6) {
      dispatch(
        cityInformationData(
          taxonomyLink[5],
          activeCurrency,
          () => { setIsLoading(false) }
        )
      );
  
      // dispatch(
      //   scrollToTargetAction(
      //     'deals'
      //   )
      // );
    };
  
    if(Array.isArray(cityData) && cityData.length > 0) {
      setIsLoading(false)
    }
  
    if ((cityData == '' ) && (taxonomyLink.length == 7 || taxonomyLink.length == 8)) {
      dispatch(
        cityInformationData(
          taxonomyLink[5],
          activeCurrency,        )
      );
  
      if (taxonomyLink[6] == 'travelguide') {
        dispatch(
          guideDetailData(
            taxonomyLink[5]
          )
        );
      };
    };
  }, [cityData, taxonomyLink, activeCurrency]);

  // taxonomy data 
  // useEffect(() => {
    if ((taxonomyData && taxonomyData.length == 0)) {
      dynamicTaxo.forEach((taxo: any) =>  Array.isArray(taxonomyData) && taxonomyData.push(taxo))
    } else if(!taxonomyData){
      dynamicTaxo.forEach((taxo: any) =>  Array.isArray(customTaxonomyData) && customTaxonomyData.push(taxo))
    }else if (taxonomyData?.length !== dynamicTaxo?.length && !isTravelguidePage) {
      dispatch(
        taxonomyClear(() => {
         dynamicTaxo.forEach((taxo: any) =>  Array.isArray(taxonomyData) && taxonomyData.push(taxo))
        })
      )
    
    } 
  // }, [taxonomyData]);

  // get transports data
  useEffect(() => {
    if(taxoLength != 3 || taxonomyLink[taxonomyLink.length - 1] != 'deals'){
      dispatch(
        transportsData(
          activeCurrency.toLowerCase()
        )
      );
    }
  }, [activeCurrency]);

  // // transports departure / arrival code
  // useEffect(() => {
  //   if (
  //     taxonomyLink &&
  //     flightsReady != transports.length &&
  //     taxonomyLink.length != 7 && 
  //     taxonomyLink.length != 6 &&
  //     taxoLength != 3 && 
  //     (
  //      taxonomyLink[taxonomyLink.length - 1] != 'travelguide' ||
  //      taxonomyLink[taxonomyLink.length - 1] != 'deals'
  //     )){
  //     for (let transport of transports) {
  //       let hasDepartureBeenCalled = departure.find((dp: any) => dp.code == transport.departureLocationCode);
  //       let hasArrivalBeenCalled = arrival.find((arr: any) => arr.code == transport.arrivalLocationCode);

  //       if(!hasDepartureBeenCalled && transport.transportType !== 'CAR'){
  //         dispatch(
  //           departureByCodeData(
  //             transport.departureLocationCode,
  //             setFlightsReady(loading => loading + 1)
  //           )
  //         );
  //       }

  //       if(!hasArrivalBeenCalled && transport.transportType !== 'CAR'){
  //         dispatch(
  //           arrivalByCodeData(
  //             transport.arrivalLocationCode
  //           )
  //         );
  //       }

  //       // wait untill flights is completely loaded
  //       // setFlightsReady(loading => loading + 1);
  //     }
  //   }
  // }, [transports]);

  // city transports by id 
  // useEffect(() => {
  //   if (
  //     taxonomyLink && 
  //     taxonomyLink.length != 7 &&
  //     taxonomyLink[taxonomyLink.length - 1] != 'travelguide' &&
  //     flightsReady != citytransportsdata.length &&
  //     (taxoLength == 3 || taxonomyLink[taxonomyLink.length - 1] == 'deals') && 
  //     (taxonomyLink.length !== 6 || taxonomyLink[taxonomyLink.length - 1] == 'deals')){
  //     for (let transport of citytransportsdata) {

  //       let hasDepartureBeenCalled = departure.find((dp: any) => dp.code == transport.departureLocationCode);
  //       let hasArrivalBeenCalled = arrival.find((arr: any) => arr.code == transport.arrivalLocationCode);

  //       if(!hasDepartureBeenCalled && transport.transportType !== 'CAR'){
  //         dispatch(
  //           departureByCodeData(
  //             transport.departureLocationCode,
  //             () => setFlightsReady(ready => ready + 1)
  //           )
  //         );
  //       }

  //       if(!hasArrivalBeenCalled && transport.transportType !== 'CAR'){
  //         dispatch(
  //           arrivalByCodeData(
  //             transport.arrivalLocationCode
  //           )
  //         );
  //       }
  //       // wait untill flights is completely loaded
  //       // setFlightsReady(loading => loading + 1);
  //     }
  //   }
  // }, [citytransportsdata]);
  
  // get city deals
  useEffect(() => {
    const _CITY_DEALS = cityData && cityData[0];
    const CITY_DEALS_IDS = _CITY_DEALS && _CITY_DEALS.field_deals;
    

    // deals
    if((taxoLength == 3 || taxonomyLink[taxonomyLink.length - 1] == 'deals') && cityData && cityData.length > 0 && CITY_DEALS_IDS && CITY_DEALS_IDS.length > 0){
      for(let _deal_id of CITY_DEALS_IDS){

        let req = {
          ideaId: _deal_id,
          lang: activeLang.toUpperCase(),
          currency: activeCurrency
        };

        dispatch(
          tripIdeasDataById(
            req
          )
        );

      }
    };

  }, [cityData, activeLang, activeCurrency]);

  // transports by id, car rental 
  useEffect(() => {
    const _CITY_DEALS = cityData && cityData[0];
    const CITY_TRANSPORTS_IDS = _CITY_DEALS && _CITY_DEALS.field_transports;

    // flights
    if(
      (taxoLength == 3 || taxonomyLink[taxonomyLink.length - 1] == 'deals') && 
      cityData && 
      cityData.length > 0 && 
      CITY_TRANSPORTS_IDS && 
      CITY_TRANSPORTS_IDS.length > 0
    ){
      for(let _deal_id of CITY_TRANSPORTS_IDS){

        let req = {
          transport_id: _deal_id
        };

        dispatch(
          transportsDataById(
            req
          )
        );

      }
    }
  }, [cityData]);

  // get flights to city 
  useEffect(() => {
    const _CITY_DEALS = cityData && cityData[0];
    const CITY_FLIGHTS_IDS = _CITY_DEALS && _CITY_DEALS.field_flights;

    // flights
    if((taxoLength == 3 || taxonomyLink[taxonomyLink.length - 1] == 'deals') && cityData && cityData.length > 0 && CITY_FLIGHTS_IDS && CITY_FLIGHTS_IDS.length > 0){
      for(let _deal_id of CITY_FLIGHTS_IDS){

        let req = {
          transport_id: _deal_id
        };

        dispatch(
          transportsDataById(
            req
          )
        );

      }
    }
  }, [cityData]);

  // city hotels data
  useEffect(() => {
    const _CITY_DEALS = cityData && cityData[0];
    const CITY_HOTELS_IDS = _CITY_DEALS && _CITY_DEALS.field_popular_hotels;

    if((taxoLength == 3 || taxonomyLink[taxonomyLink.length - 1] == 'deals') && cityData && cityData.length > 0 && CITY_HOTELS_IDS && CITY_HOTELS_IDS.length > 0){
      for(let _hotel_id of CITY_HOTELS_IDS){
        dispatch(
          accomodationData(
            _hotel_id.field_hotel_id, 
            activeLang.toUpperCase()
          )
        )
      }
    }
}, [cityData]);

// city activities data
useEffect(() => {
  const _CITY_DEALS = cityData && cityData[0];
  const CITY_ACTIVITIES_IDS = _CITY_DEALS && _CITY_DEALS.field_activities;

  if(
    (taxoLength == 3 || taxonomyLink[taxonomyLink.length - 1] == 'deals') && 
    cityData && 
    cityData.length > 0 && 
    CITY_ACTIVITIES_IDS && 
    CITY_ACTIVITIES_IDS.length > 0
    ){
    for(let _activity_id of CITY_ACTIVITIES_IDS){

      let req = {
        activity_id: _activity_id
      };

      dispatch(
        activitiesDataById(
          req
        )
      );
    }
  }
}, [cityData]);

 // city transfers data 
 useEffect(() => {
  const _CITY_DEALS = cityData && cityData[0];
  const CITY_TRANSFERS_IDS = _CITY_DEALS && _CITY_DEALS.field_transfers;

  if(
    (taxoLength == 3 || taxonomyLink[taxonomyLink.length - 1] == 'deals') && 
    cityData && 
    cityData.length > 0 && 
    CITY_TRANSFERS_IDS && 
    CITY_TRANSFERS_IDS.length > 0
  ){
    for(let _deal_id of CITY_TRANSFERS_IDS){

      let req = {
        transfer_id: _deal_id
      };

      dispatch(
        transfersDataById(
          req
        )
      );

    }
  }
}, [cityData]);

  // const browseDestination = (dest: any) => {
  //   dispatch(
  //     taxonomyDir(dest)
  //   );
  // };

  let citytripideas_by_currency = citytripideas.filter((tripidea: any) => tripidea.totalPrice.currency == activeCurrency);

  let citytripideas_unique: any = {};
  let citytransportsdata_unique: any = {};
  let accomodations_unique: any = {};

  let filter_duplicated_citytripideas = citytripideas_by_currency && citytripideas_by_currency.filter((citytripidea: { id: string | number; }) => !citytripideas_unique[citytripidea && citytripidea.id as keyof any] && (citytripideas_unique[citytripidea && citytripidea.id] = true));

  let filter_duplicated_citytransportsdata = citytransportsdata && citytransportsdata.filter((citytransportidea: { id: string | number; }) => !citytransportsdata_unique[citytransportidea && citytransportidea.id as keyof any] && (citytransportsdata_unique[citytransportidea && citytransportidea.id] = true));

  
  let filter_duplicated_accomodations = accomodations.filter((accomodation: { id: string | number; }) => !accomodations_unique[accomodation.id as keyof any] && (accomodations_unique[accomodation.id] = true));

  const DYNAMIC_CITYTRIPIDEAS_DATA = filter_duplicated_citytripideas;
  const DYNAMIC_CITYTRANSPORTS_DATA = filter_duplicated_citytransportsdata;
  const DYNAMIC_HOTELS_DATA = filter_duplicated_accomodations;
  const DYNAMIC_CITYRENTALCAR_DATA = DYNAMIC_CITYTRANSPORTS_DATA && DYNAMIC_CITYTRANSPORTS_DATA.filter((car: any) => car.transportType == 'CAR');
  const DYNAMIC_CITY_ACTIVITIES_DATA = cityactivitiesdata;
  const DYNAMIC_CITY_TRANSFERS_DATA = citytransfersdata && citytransfersdata.filter((transfer : any) => !transfer.hasOwnProperty('error'));

  const IDEA_DATA = countriesData;
  const CITY_GUIDE = cityData && cityData.length > 0 && Array.isArray(cityData) && cityData?.filter((_: any, i: any) => i < 9);

  useEffect(() => {
    if (tripIdea.name && tripIdea.name !== '') {

      let newTaxonomy = taxonomy.push(tripIdea.name);
      localStorage.setItem('taxonomy', JSON.stringify(taxonomy.push(tripIdea.name)));

      // populate taxonomy 
      let dest = tripIdea;
      dispatch(
        taxonomyDir(dest)
      )
    };

    if (tripIdea.city && tripIdea.city !== '') {
      //  console.log(tripIdea);
      let new_taxonomy = taxonomy.push(tripIdea.city);
      //  console.log({new_taxonomy});
      localStorage.setItem('taxonomy', JSON.stringify(taxonomy.push(tripIdea.city)));

      let dest = tripIdea.city;
      dispatch(
        taxonomyDir(dest)
      )
    };

    // destination detail
    if (tripIdea.tid) {
      dispatch(
        destinationDetail(
          tripIdea.tid
        )
      );
    };

    // package dl
    if (tripIdea && tripIdea.hasOwnProperty('ideaUrl')) {
      let id = tripIdea && tripIdea.id;
      let title = tripIdea.title.toLowerCase().replaceAll(',', " ");
      let city = title.split(" ");
      let cityFormated = [];

      for (let i = 0; i < city.length; i++) {
        if (city[i] !== '' || city[i] !== '+') cityFormated.push(city[i]);
      };

      let cityName = cityFormated.join("-");
      const ideaUrl = BASE_URL_HOME + "/idea/brochure.xhtml?id=" + id + "&title=" + cityName + "&lang=" + activeLang + "&currency=" + activeCurrency + "&agency=bookperfect"

      // render url
      if (ideaUrl) goToPage(ideaUrl, 'redirect');
    }

  }, [tripIdea]);

  useEffect(() => {
    if (activeGuide.guide != '') localStorage.setItem('taxonomy', JSON.stringify(taxonomy.push(activeGuide.guide)));
  }, [activeGuide]);

  const handleGuideSelect = (guide: any) => {
    setActiveGuide({ guide: guide });

    let dest = { name: 'Travel Guide' };
    dispatch(
      taxonomyDir(dest)
    )
  };

  const POPULAR_CITIES_DATA = useMemo(() => {
    return discoverDestination && discoverDestination?.map(
      (city: any, index: number) => {
        return {
          name: city.name,
          tid: city.tid,
          image: popularparisImg, //TODO: use image from drupal
          continent_name: city.continent_name,
          continent_tid: city.continent_tid,
          country_name: city.country_name,
          country_tid: city.country_tid,
          button: [
            {
              tid: city.tid,
              citycode: city.name,
              type: 'deals',
              name: 'Travel Deals',
              icon: 'deals'
            },
            {
              tid: city.tid,
              nid: city.tid,
              type: 'guide',
              name: 'Travel Guide',
              icon: 'guide'
            }
          ]
        }
      });
  }, [discoverDestination]);

  // popular city data
  const POPULAR_DEST_CITIES_DATA = useMemo(() => {
    return popularcitiesdata && popularcitiesdata[0].field_popular_cities?.map(
      (city: any, index: number) => {
        return {
          name: city.field_city.name,
          tid: city.field_city.tid,
          image: BASE_URL + city.field_image.url,
          continent_name: city.field_city.continent_name,
          continent_tid: city.field_city.continent_tid,
          country_name: city.field_city.country_name,
          country_tid: city.field_city.country_tid,
          button: [
            {
              tid: city.field_city.tid,
              citycode: city.field_city.name,
              type: 'deals',
              name: 'Travel Deals',
              icon: 'deals'
            },
            {
              tid: city.tid,
              nid: city.field_city.tid, // TODO: get this nid from drupal
              type: 'guide',
              name: 'Travel Guide',
              icon: 'guide'
            }
          ]
        }
      });
  }, [popularcitiesdata]);

  const FILTER_DISCOVER_TABS = countriesData && countriesData.filter((_: any, i: number) => i < 6);
  const DISCOVER_POPULAR_TABS = useMemo(() => {
    return FILTER_DISCOVER_TABS && FILTER_DISCOVER_TABS?.map(
      (country: any) => {
        return {
          name: country.name,
          tid: country.tid
        }
      }
    )
  }, [countriesData]);

  if (taxonomyData && taxonomyData.length > 1 && DISCOVER_POPULAR_TABS && DISCOVER_POPULAR_TABS[0] && DISCOVER_POPULAR_TABS[0].name !== 'Recommended') DISCOVER_POPULAR_TABS.splice(0, 0, { name: 'Recommended', tid: taxonomyData && taxonomyData[1].tid });

  // scroll to products
  let scrollToT = scrollId

  // scroll to products
  // let scrollToT = taxonomyLink[taxonomyLink.length - 1];
  const toView = document.getElementById(scrollToT) as HTMLInputElement | null;
  useEffect(() => {
    if(scrollToT == 'deals'){
      console.log('the active item problem: toView: ', toView)
      const scrollPosition = toView?.getBoundingClientRect()?.top! + window.pageYOffset + yOffset ;
      window.scrollTo({
        top: scrollPosition, 
        behavior: 'smooth'
      }); 

    };
  }, [toView]);

  useEffect(()=> {
    // console.log('navigation problem : taxonomyData', taxonomyData, "dynamicTaxo" ,dynamicTaxo )
  } ,[taxonomyData, dynamicTaxo])


  if(
    taxonomyLink && 
    taxonomyLink.length == 8 && 
    scrollToT !=  'deals' && 
    (!scrolltotarget || scrolltotarget == '')
  ){
    dispatch(
      scrollToTargetAction(
        scrollToT
      )
    )
  };

  const RerenderStop = useMemo(() => {
   return <HomepageHeroSearch
            currentTab={{
              tabName: "Trip Designer",
              tabIcon: <Map size={23} />
            }}
            searchcardplace={window.location.pathname}
          
            inputClassNames='xl:pl-3'
            pls='pr-3'
            iconClassNames=''
            scrollButtonClassNames='!bg-[#F75847]'
            style='bigMd:w-[100%]'
            tabStyle='10px 10px 0px 0px'
            padding=".8rem 1.5rem"
            space=""
            className='!px-0 !h-auto drop-shadow-[0px_6px_32px_rgba(255,_197,_191,_0.28)]'
            customContainer={'xl:mx-[10vw] w-auto'}
          />
  }, []);

  const _IDEAS_DATA = (taxoLength != 1 && DYNAMIC_CITYTRIPIDEAS_DATA.length > 0 && DYNAMIC_CITYTRIPIDEAS_DATA) ? DYNAMIC_CITYTRIPIDEAS_DATA : (taxoLength == 1 ? countriesData : []);

  return (
    <div>
      {/* <Loader
        data={(
          (
            _IDEAS_DATA && _IDEAS_DATA.length > 0 
            // && ([flightsReady, flightsReady / 2].includes(citytransportsdata.length) || flightsReady > citytransportsdata.length )
            ) ||
          (transports.length == 0 ) ||
          (citytransportsdata.length > 0 ) ||
          (
            taxonomyLink.length == 1 
            // && ([flightsReady, flightsReady / 2].includes(transports.length) || flightsReady > transports.length )
          ) ||
          (citiesData && citiesData.length > 0) ||
          (taxonomyLink[taxonomyLink.length - 1] == 'travelguide' || taxonomyLink.length == 7)
          ) ? false : true}
      /> */}

      {
        isContinentPage &&
        <Loader data={!_IDEAS_DATA && _IDEAS_DATA.length != 0 } />

      }

      
      {
        isCountryPage && 
        <Loader data={
          (transports.length == 0 ) ||
          (citytransportsdata.length > 0 )
        } />
      }

      {
        isCityPage && 
        <Loader data={
          (citiesData && citiesData.length == 0)
        } />
      }

      {
        isDealsPage && isLoading &&
        <Loader 
          data={
            _IDEAS_DATA.length == 0 &&
            destinationDetailData == 0
          }
        />
      }

      {
        isTravelguidePage && 
        <Loader 
          data={
            cityData?.length == 0
          }
        />
      }

      <Helmet>
        <meta charSet="utf-8" />
        <title> Bookperfect || Travelguide </title>
      </Helmet>

      <HeroHead
        className='hero-head-travelguide-europe'
        searchCard="travelguide"
        headText="Travel Guide"
        headType="travelguide"
        subText="Incredible value deals and inspiring travel articles, for you to plan, discover and dream."
        taxonomy={taxonomyData && taxonomyData?.length ? Array.from(new Set(taxonomyData)) : customTaxonomyData}
        onTaxonomy={() => setActiveGuide({ guide: '' })}
        isPageDataReady={ _IDEAS_DATA && _IDEAS_DATA}
        isDealsPage={isDealsPage}
      />
      
      { (isContinentPage || isCountryPage || isCityPage || isDealsPage)  &&
        <>
          <div className="search-card flex-row mx-5 bigMd:mx-[10vw] drop-shadow-[0px_6px_32px_rgba(255,_197,_191,_0.28)]" >
            {/* CONSOLE.LOG() */}
            <div className='mt-10 flow-root'>
              <Heading
                desc="lorem ipsum dolor sit amet, consectetur adipiscing"
                headingWrapperClassNames='!text-base md:!text-lg lg:!text-xl xl:text-2xl'
              >
                {t("TRAVEL_GUIDE.BUNDLE_YOUR_FLIGHTS_+_STAY_TOGETHER_AND_SAVE!_PLUS_NO_ONLINE_BOOKING_FEES!")}
              </Heading>
            </div>
          </div>
          <div className='hi' >
            {RerenderStop}
          </div>

          <div className='mt-[5vh]' id="deals" style={{ paddingTop: `${calculatedSpace >= 0 ? calculatedSpace : 0}px` }}>
            <TripIdeas
              heading={`Popular ${taxonomyData && taxonomyData.length > 0 && taxonomyData[taxonomyData.length - 1] && taxonomyData[taxonomyData.length - 1].name ? capitalizeFirstLetter(taxonomyData[taxonomyData.length - 1].name && taxonomyData[taxonomyData.length - 1].name) : 'Europe'} ${taxoLength == 3 ? 'Deals' : (taxoLength == 2 ? 'Cities' : ( taxoLength == 1 ? 'Countries' : ''))}`}
              subHeading=""
              ideasType="deals"
              bgColor=''
              OnTripIdea={(tripTo: any) => setTripIdea(tripTo)}
              ideaData={_IDEAS_DATA}
              taxonomy={taxonomy}
              ButtonAndTextWrapperClassName={'w-full'}
              displayStyle={ ![1, 2].includes(taxoLength) ? 'slider' : ''}
            />
          </div>

          <div className='lg:py-[4vh]'>
            {
              // destinationDetailData
              <DestinationDetail
                classStyle="mt-16"
                taxonomy={Array.from(new Set(taxonomyData))}
                data={destinationDetailData}
              />
            }
          </div>

          {

            DISCOVER_POPULAR_TABS &&
            POPULAR_CITIES_DATA &&
            taxonomyData && taxonomyData.length == 2 &&
            <div className='border-opac py-[4vh]'>  
              <TripIdeas
                heading={`Discover Destinations`}
                subHeading="There are many variations of passages of Lorem Ipsum available, but the"
                ideasType="discoverdestination"
                bgColor=''
                tabs={DISCOVER_POPULAR_TABS}
                ideaData={POPULAR_CITIES_DATA}
                taxonomy={taxonomy}
                headingWrapperClassNames="md:!text-2xl md:font-normal md:!pt-0 md:!mt-0"
                topSectionClassNames='border-b border-[#0E123D] border-opacity-20 md:pb-[15px]'
                subheadingClassNames='md:!mt-0 md:!pt-0'
              />
            </div>
          }
          {
            taxonomyData &&
            <div className={`relative py-16 ${taxonomyData && taxonomyData != undefined && taxonomyData?.length == 3 && 'mt-24'}`}>
              { 
                !CITY_GUIDE || [0, 1, 2].includes(taxonomyData && taxonomyData.length) ?

                  <>
                    {
                      taxonomyData &&
                      taxonomyData.length == 1 &&
                      countriesData &&
                      POPULAR_DEST_CITIES_DATA &&
                      <Popular
                        data={POPULAR_DEST_CITIES_DATA}
                        type="travelguide"
                        tabs={countriesData}
                        heading="Popular Destinations"
                        subHeading=" There are many variations of passages of Lorem Ipsum available, but the "
                      />
                    }
                  </>
                  :
                  <>
                  <SectionBackground
                    className={`bg-[#3944B3] dark:bg-black dark:bg-opacity-20`}
                    isWidth="xl:max-w-full"
                    isRounded=""
                    id='destination'
                  />
                    <CityGuide
                      heading={t("TRAVEL_GUIDE.NEED_HELP_PLANNING?_CHECK_OUT_OUR_TRAVEL_GUIDES")}
                      subHeading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                      city={CITY_GUIDE && CITY_GUIDE[0].name}
                      guides={CITY_GUIDE}
                      onGuideSelect={(guide: any) => handleGuideSelect(guide)}
                      taxonomy={taxonomyData && taxonomyData?.length ? Array.from(new Set(taxonomyData)) : customTaxonomyData}
                    />
                  </>
              }
            </div>
          }
          {
            (taxonomyData.length == 4 || taxonomyLink[taxonomyLink.length - 1] == 'deals') ?

              <div className="md:mt-24">
                <CheapestFlights
                  heading={`Popular ${taxonomyData[taxonomyData && taxonomyData.length - 1] && taxonomyData[taxonomyData && taxonomyData.length - 1].name ? capitalizeFirstLetter(taxonomyData[taxonomyData && taxonomyData.length - 1] && taxonomyData[taxonomyData && taxonomyData.length - 1].name) + ' Deals' : 'Europe'}`}
                  subHeading= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                  data={DYNAMIC_CITYTRANSPORTS_DATA}
                  ideasModel = "travelguidecitydeals"
                  parrentClassname = ""
                  useCompactStyles
                />
                {
                  DYNAMIC_HOTELS_DATA && DYNAMIC_HOTELS_DATA.length > 0 &&
                  <>
                  <TripIdeas 
                    ideaData = { DYNAMIC_HOTELS_DATA && DYNAMIC_HOTELS_DATA } 
                    OnTripIdea = {(data: any) => console.log(data) } 
                    wrapperClassNames=""
                    ideasType = 'hotels'
                    ideasModel = "travelguidecitydeals"
                    bgColor=""
                    className = "grid grid-cols-1 sm:grid-cols-2 gap-2 2xl:gap-5 md:mt-5"
                    tabStyle = 'w-full'
                    containerTripdesigner='w-full'
                    navItemStyle=''
                    subNave='text-[14px] sm:text-[14px] py-2 px-[18px] sm:px-[30px] sm:py-[15px] '
                    listStyle = 'w-[80%] overflow-x-scroll item-center px-1 mt-3 md:mt-0'
                    id={true}
                  />
                  {
                    PROMOTING_SPECIAL_PRODUCT_BANNER_BY_CITY.includes(CURRENT_CITY_TID) &&
                    <div className='mt-8 flex-col space-y-8 cursor-pointer md:mx-[10.1vw]'>
                      <img onClick={() => goToPage('https://www.novaplazahotels.com/en/', 'redirect')} src={novaplaza} className="w-[100%]" />
                    </div>
                  }
                  </>
                  
              }
           

             
              {
                DYNAMIC_CITYRENTALCAR_DATA &&
                DYNAMIC_CITYRENTALCAR_DATA.length > 0 &&
                  <div className='mb-24'>
                      <CarRental 
                        data = { DYNAMIC_CITYRENTALCAR_DATA } 
                        // ideasModel = "travelguidecitydeals"
                        statictext = { staticpagetext && staticpagetext[0].translations } 
                        // cardClassNames='md:min-w-[284px]'
                        cardWidth={!isMobile && hotelsCardWidth}
                        showHeader={false}
                        showSliderButtonsForDesktop={false}
                        
                      />
                  </div>
              }

                {
                  DYNAMIC_CITY_ACTIVITIES_DATA && DYNAMIC_CITY_ACTIVITIES_DATA.length > 0 &&
                  <div className='mb-24'>
                    <TopSearchResult
                      searched="activities"
                      listing={4}
                      cols={4}
                      data = { DYNAMIC_CITY_ACTIVITIES_DATA }
                      ideasModel = "travelguidecitydeals"
                      cardWidth = {!isMobile && hotelsCardWidth}
                      isSlider
                      showSliderButtonsForDesktop = {false}
                      

                    />
                </div>
                }
              {
                DYNAMIC_CITY_TRANSFERS_DATA &&
                DYNAMIC_CITY_TRANSFERS_DATA.length > 0 &&
                  <div className='pb-20'>
                      <PopularAirports 
                        data = { DYNAMIC_CITY_TRANSFERS_DATA }
                        // ideasModel = "travelguidecitydeals" 
                        statictext = { staticpagetext && staticpagetext[0].translations } 
                        cardWidth={!isMobile && hotelsCardWidth}
                        showHeader={false}
                        showMoreButton = {false}
                        showSliderButtonsForDesktop = {false}

                      />
                  </div>
              }
              
              </div> :

              <div className={`relative ${taxonomyData.length > 1 ? '-mt-32' : ''} `}>
                {/* for bacground image of this section bg-[url(')] : bg-gradient-to-r from-sky-500 to-indigo-500 */}
                <SectionBackground
                  className="bg-[#F4F8FF] dark:bg-black dark:bg-opacity-20"
                  isWidth="xl:max-w-full"
                  isRounded=""
                  
                />
                {
                  <CheapestFlights
                    heading={`Flight to ${taxonomyData[taxonomyData && taxonomyData.length - 1] && taxonomyData[taxonomyData && taxonomyData.length - 1].name ? capitalizeFirstLetter(taxonomyData[taxonomyData && taxonomyData.length - 1] && taxonomyData[taxonomyData && taxonomyData.length - 1].name) : 'Europe'}`}
                    data={transports}
                    useCompactStyles
                  />
                }
              </div>
          }

        </> }
        {
         isTravelguidePage &&
         <>
       
        <Guide
          guides={CITY_GUIDE && CITY_GUIDE[0].field_info_subtopics}
          activeGuide={activeGuide}
          onGuideSelect={(guide: any) => setActiveGuide({ guide: guide.title })}
          city={(taxonomyData && taxonomyData[2]?.name) ?? customTaxonomyData[2]?.name}
          taxonomy={taxonomyData ? taxonomyData : customTaxonomyData}
          scrolltotarget={scrolltotarget}
          cityInfo={CITY_GUIDE && CITY_GUIDE[0]}
          />
          </>

      }
 
      {/* <Loader data={transports?.length == 0 || citytransportsdata?.length == 0}/> */}
     

      {
        <div>
          <div className='mt-[3vh] dark:mt-0'>
            <ShortCutRouting statictext = { staticpagetext && staticpagetext[0].translations } />
          </div>

          {/* <TravelBlog
            heading={ ( staticpagetext && staticpagetext[0].translations.travel_blog ) ?? 'Travel Blog' }
            subHeading={ ( staticpagetext && staticpagetext[0].translations.travel_blog_description ) ?? 'Find incredible value with our travel deals' } 
            customStyle={{ marginTop: '57px', marginLeft: '195px', width: '1050px' }}
            customStyles="py-[5vh]"
          /> */}
        </div>
      }

      {/* Membership banner */}
      <div className="mt-[80px]">
        <MailchimpSubscribe
            url={ MAILCHIMP_API_URL }
            render={({ subscribe, status, message }: any) => (
                <Membership
                  status={status}
                  message={message}
                  onValidated={(formData: any) => subscribe(formData)}
                  statictext = { staticpagetext && staticpagetext[0].translations }
                />
            )}
        />
      </div>

      {/* {
      [0, 1, 2, 3].includes(taxonomyData.length) &&
        <div className='py-[4vh]'>
          <ProductDeals
            data={PopularDealsData}
            heading="All Flights Deals"
            subHeading="There are many variations of passages of Lorem Ipsum available, but the"
          />
        </div>
      } */}

      {/* { isSearching && <Loader load = { isSearching } onIsSearched = {(seachedDone: boolean) => setIsSearching(seachedDone)} /> } */}
    </div>
  )
};

export default Destinations;