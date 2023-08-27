import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import HeroHead from '../../components/HeroHeader/HeroHead';
import Loader from '../../components/Loader/Loader';
import Popular from '../../components/Popular/Popular';
import { BASE_URL } from '../../api/env';
import { countries, faqs, popularcities, travelnews } from '../../store/actions';

import Membership from '../../components/membership/membership';
import { POPULAR_COUNTRIES_CONTINENT_ID } from '../../data/PopularData';
import { SectionBackground, TravelBlog } from '../../components';
import Disclosure from '../../components/Disclosure/Disclosure';
import ProductDeals from '../../components/ProductDeals/ProductDeals';
import { PopularDealsData } from '../../data/ProductDealsData';
import { DEFAULT_FAQ_ID } from '../../components/Disclosure/FAQTab';
import TravelNewsDetail from '../../components/TravelNews/TravelNewsDetail';
import img1 from '../../images/Suitcase.svg';
import img2 from '../../images/Location.svg';
import img3 from '../../images/Adventure.svg';
import TravelNewsCollection from '../../components/TravelNews/TravelNewsCollection';
const News = () => {
  const data = [
    {
      img: img1,
      title: 'Letraset sheets containing',
      describtion: 'There are many variations of passages of...',
      monthName: 'OCT',
      day: '03',
    },
    {
      img: img2,
      title: 'Letraset sheets containing',
      describtion: 'There are many variations of passages of...',
      monthName: 'OCT',
      day: '21',
    },
    {
      img: img3,
      title: 'Letraset sheets containing',
      describtion: 'There are many variations of passages of...',
      monthName: 'OCT',
      day: '16',
    },
    {
      img: img1,
      title: 'Letraset sheets containing',
      describtion: 'There are many variations of passages of...',
      monthName: 'OCT',
      day: '03',
    },
    {
      img: img2,
      title: 'Letraset sheets containing',
      describtion: 'There are many variations of passages of...',
      monthName: 'OCT',
      day: '21',
    },
    {
      img: img3,
      title: 'Letraset sheets containing',
      describtion: 'There are many variations of passages of...',
      monthName: 'OCT',
      day: '16',
    },
    {
      img: img1,
      title: 'Letraset sheets containing',
      describtion: 'There are many variations of passages of...',
      monthName: 'OCT',
      day: '03',
    },
    {
      img: img2,
      title: 'Letraset sheets containing',
      describtion: 'There are many variations of passages of...',
      monthName: 'OCT',
      day: '21',
    },
    {
      img: img3,
      title: 'Letraset sheets containing',
      describtion: 'There are many variations of passages of...',
      monthName: 'OCT',
      day: '16',
    },
  ];
  const popularcitiesdata: any = useSelector((state: { PopularDestinationsReducer: any; }) => state.PopularDestinationsReducer.popularcities);
  const countriesData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.countries);
  const faqsdata: any = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.faqs);
  const travelnewsdetails: any = useSelector((state: { TravelNewsReducer: any; }) => state.TravelNewsReducer.travelnewsdetails);
  const travelnewsdata: any = useSelector((state: { TravelNewsReducer: any; }) => state.TravelNewsReducer.travelnews);

  const dispatch = useDispatch();

  // console.log({ travelnewsdetails }, { travelnewsdata });
  useEffect(() => {
    // get popular cities
    dispatch(
      popularcities()
    );

    if (!countriesData) {
      dispatch(
        countries(
          POPULAR_COUNTRIES_CONTINENT_ID
        )
      );
    };

    if (!travelnewsdata) {
      dispatch(
        travelnews()
      )
    };

  }, []);

  useEffect(() => {
    if (!faqsdata) {
      dispatch(
        faqs(DEFAULT_FAQ_ID)
      );
    }
  }, [faqsdata]);

  if (!travelnewsdata) {
    dispatch(
      travelnews()
    )
  };

  // popular city data
  const POPULAR_CITIES_DATA = useMemo(() => {
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

  const _TRAVEL_NEWS_DATA = travelnewsdetails && travelnewsdata && travelnewsdata.filter((news: any, index: number) => news.nid !== travelnewsdetails[0].nid);
  const TRAVEL_NEWS_DATA_FILTER = _TRAVEL_NEWS_DATA && _TRAVEL_NEWS_DATA.filter((_: any, i: number) => i < 6);

  return (
    <div>
      <Loader data={(travelnewsdetails.length > 0 || travelnewsdata.length > 0) ? false : true} />
      <HeroHead
        className='hero-head-travelnews'
        searchCard='travelnews'
        headText="Travel News"
        headType="travelnews"
      />
      {
        travelnewsdetails &&
        <div className='mt-[44px]'>
          <TravelNewsDetail data={travelnewsdetails && travelnewsdetails[0]} />
        </div>
      }

      {
        travelnewsdata &&
        <div className='overflow-hidden'>
          <TravelNewsCollection id={'NEWS'} title={travelnewsdetails && 'Others Travel News'} data={travelnewsdetails !== '' ? TRAVEL_NEWS_DATA_FILTER : travelnewsdata} />
        </div>
      }

      <div className=''>
        <Membership />
      </div>

      {/* poppular hotel deals */}
      <div className=''>
        {
          POPULAR_CITIES_DATA &&
          <Popular
            data={POPULAR_CITIES_DATA}
            heading="Popular Destinations"
            subHeading=" There are many variations of passages of Lorem Ipsum available, but the "
          />
        }
      </div>

      {/* FAQ Section */}
      {faqsdata &&
        <div className="relative py-8 md:pt-[5vh] md:pb-10">
          <SectionBackground className="bg-[#F4F8FF] dark:bg-transparent dark:bg-opacity-20 " />
          <Disclosure items={faqsdata && faqsdata[0].field_detail_cards} />
        </div>
      }

      <div className="pt-[4vh]">
        {/* <TravelBlog
          heading="Travel Blog"
          subHeading="lorem ipsum dolor sit amet, consectetur"
          // customStyle={{ marginTop: '57px', marginLeft: '195px', width: '1050px' }}
          customStyles="pt-[1.5vh]"
        /> */}
      </div>

      {/* all flight deals */}
      <div className='py-[4vh]'>
        <ProductDeals
          data={PopularDealsData}
          heading="All Flights Deals"
          subHeading="There are many variations of passages of Lorem Ipsum available, but the"
        />
      </div>

    </div>
  )
};

export default News;