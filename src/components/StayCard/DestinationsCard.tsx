import React, { FC, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { DEMO_STAY_LISTINGS } from "../../data/listings";

import Badge from "../Badge/Badge";

import americaimage from '../../images/americaimage.svg';
import asiaimage from '../../images/asiaimage.svg';
import europeimage from '../../images/europeimage.svg';

import americamap from '../../images/americamap.svg';
import asiamap from '../../images/asiamap.svg';
import europemap from '../../images/europemap.svg';

import styled from "styled-components";

import { cities, countries, destinationDetail, guideDetailData, taxonomyClear, taxonomyDir } from "../../store/actions/TravelguideActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import StringToBoolean from "../../common/StringToBoolean";
import BASE_URL_HOME from "../../api/env";
import { goToPage } from "../../common/goToPage";
// import { CONTINENT_DATA } from "../TopInterDestinations/BrowserDestinations";

const CONTINENT_DATA = [
  {
    name: 'Europe',
    cardImage: europeimage,
    map: europemap,
    cities: ["London", "Rome", "Anthens", "Barcelona", "Paris", "Amsterdam", "Dublin", "Manchester"]
  },
  {
    name: 'Asia',
    cardImage: asiaimage,
    map: asiamap,
    cities: []
  },
  {
    name: 'America',
    cardImage: americaimage,
    map: americamap,
    cities: []
  },
];

export interface BlogCardProps {
  className?: string;
  ratioClass?: string;
  data?: any;
  size?: "default" | "small";
  cardType?: string;
  browseDestination?: any;
};

const PriceWrapper = styled.div`
  // position: absolute;
  width: 47px;
  height: 27px;
  // left: 314px;
  // top: 499px;
  margin-left: 50%; 

  /* h6/bold */

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */


  /* primary */

  color: #3944B3;
`;

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const INIT_DATA = CONTINENT_DATA[0];

const DestinationsCard: FC<BlogCardProps> = ({
  size = "default",
  className = "",
  data = INIT_DATA,
  ratioClass,
  cardType,
  browseDestination
}) => {

  const {
    name,
    cardImage,
    map,
    tid
  } = data;

  const [selectedCity, setSelectedCity] = useState<any>();
  const [continentId, setContinentId] = useState<any>();

  const dispatch = useDispatch();
  const taxonomyData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.taxonomydir);
  const countriesData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.countries);
  const destinationDetailData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.destinationdetail);
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  const isTravelCompositorDealsPage = StringToBoolean(process.env.REACT_APP_USE_TRAVEL_COMPOSITOR_DEALS_PAGE);

  let history = useHistory();
  // @ts-ignore
  const { t } = useTranslation()

  const handleDestination = (event: any, city: any) => {
    var dynamicUrl = '';
    // continent

    if (city) {

      let staticTaxo: any = [
        {
          name: name,
          tid: tid
        },
        {
          name: city.country_name,
          tid: city.country_tid
        },
        {
          name: city.name,
          tid: city.tid
        }
      ];

      if (isTravelCompositorDealsPage) {
        // let citycode = city.name.toLowerCase();
        // let dealspage = BASE_URL_HOME + "/" + activeLang.toLowerCase() + "/destination/" + citycode;

        // goToPage(dealspage, 'redirect');
        // return;

        staticTaxo.push({ name: 'Travel Guide' });
        for (let i = 0; i < staticTaxo.length; i++) {
          dispatch(
            taxonomyDir(staticTaxo[i])
          );
        };

        dispatch(
          guideDetailData(city.subtopics[0].nid, city.subtopics[0])
        );

        // active seearch guide
        // setTimeout(() => {
        //   dispatch(
        //     activeSearchGuide(subtopic)
        //   );
        // }, 2000);
        // console.log('the Main searchbar Problem:  subtopic', subtopic)
        dynamicUrl = window.location.origin + "/" + activeLang + "/travelguide/" + staticTaxo[0].name.toLowerCase() + "/" + staticTaxo[1].name.toLowerCase() + "/" + staticTaxo[1].tid + "/" + staticTaxo[2].name.toLowerCase() + "/" + staticTaxo[2].tid + '/travelguide/' + city.subtopics[0]?.id;
        window.location.href = dynamicUrl;

        return;
      };
      // destination detail
      // dispatch(
      //   destinationDetail(
      //       city.tid
      //     )
      // );

      // // continent
      // let staticTaxo = [
      //   {
      //     name: name,
      //     tid: tid
      //   },
      //   {
      //     name: city.country_name,
      //     tid: city.country_tid
      //   },
      //   {
      //     name: city.name,
      //     tid: city.tid
      //   }
      // ];

      if (taxonomyData && taxonomyData.length > 0) {
        dispatch(
          taxonomyClear()
        );
      };

      // callback
      browseDestination(data, staticTaxo);

    } else {
      browseDestination(data, null);
    }

    let link = '/' + activeLang + '/travelguide/' + `${event.toLowerCase()}`;
    // console.log('this is the link: ', link)
    history.push(link);
  };

  // const handleCity = (city: any, continent_id: any) => {

  //   // destination detail
  //   dispatch(
  //     destinationDetail(
  //       city.tid
  //     )
  //   );

  //   // continent
  //   let staticTaxo = [
  //     {
  //       name: destinationDetailData[0].continent_name,
  //       tid: destinationDetailData[0].continent_tid
  //     }
  //   ];
  // };

  useEffect(() => {
    if (selectedCity) {
      dispatch(
        taxonomyDir(selectedCity)
      )
    }
  }, [selectedCity]);

  // TODO: image fit content for different hotels images
  const renderContent = () => {
    return (
      <div className="bg-white min-h-[100%] rounded-lg shadow-md mb-4 dark:bg-gray-800 dark:border-gray-700 hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] transition-shadow w-[100%] h-[100%]">

        <div className="relative"
          onClick={(e: any) => handleDestination(name, null)}
        >
          <img style={{ cursor: 'pointer', width: '100%' }} className="w-full" src={cardImage} alt="product image" />
          <div className='absolute right-3 -bottom-10 w-20 h-20 border bg-white rounded-xl'>
            <img style={{ cursor: 'pointer' }} src={map} className='ml-2 mt-2' />
          </div>
        </div>
        <div className="px-5 py-5 flex-1 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
          <div className="cursor-pointer">
            <a onClick={(e: any) => handleDestination(name, null)}>
              <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
            </a>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2" onClick={(e: any) => handleDestination(name, null)}>
              <span className="text-xs">{t('SEE_ALL_DESTINATIONS')} {name}</span>
            </div>
          </div>
          <div className="flex mt-3">
            <div className="flex-1 flex-column space-y-2">
              {
                data &&
                data?.cities &&
                data?.cities.slice(0, 4).map((city: any, index: number) => {
                  // let link = "/travelguide/" + city.name.toLowerCase();
                  return (
                    <a key={index} className="flex flew-row space-x-3 mt-3 cursor-pointer" onClick={(e: any) => handleDestination(null, city)}>
                      <span className="text-[#3842B2] dark:text-[#fff]"> {">"} </span>
                      <span className="text-[#3842B2] text-sm text-normal dark:text-[#fff]"> {city.name} </span>
                    </a>
                  )
                })
              }
            </div>
            <div className="flex-1 flex-column space-y-2">
              {
                data &&
                data?.cities &&
                data?.cities.slice(4, 8).map((city: any, index: number) => {
                  // let link = "/travelguide/" + city.name.toLowerCase();

                  return (
                    <a key={index} className="flex flew-row space-x-3 mt-3 cursor-pointer" onClick={(e: any) => handleDestination(null, city)}>
                      <span className="text-[#3842B2] dark:text-[#fff]"> {">"} </span>
                      <span className="text-[#3842B2] text-sm text-normal dark:text-[#fff]"> {city.name} </span>
                    </a>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div

      className={`trip-idea-card group flex relative bg-white dark:bg-neutral-900 dark:border-neutral-800 rounded-2xl mb-[2vw] ${className}`}
    > {renderContent()}
    </div>
  );
};

export default DestinationsCard;
