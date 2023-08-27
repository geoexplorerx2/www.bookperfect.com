import React from 'react'
import { useSelector } from 'react-redux';
import BASE_URL_HOME from '../../api/env';
import { goToPage } from '../../common/goToPage';
import HeroInputSearch from '../../components/HeroInputSearch/HeroInputSearch';
import NotFound from '../../components/NotFound/NotFound';
import TripIdeaCard from '../../components/StayCard/TripIdeaCard';
import CustomDivider from '../../lib/Divider/CustomDivider';
import { useLocation } from 'react-router-dom';

const MyIdeas = ({ data }: any) => {
  const currentURL = useLocation();
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);

  const handleTripIdeas = (trip: any) => {
    let id = trip && trip.id;
    let title = trip.title.toLowerCase().replaceAll(',', " ");
    let city = title.split(" ");
    let cityFormated = [];

    for (let i = 0; i < city.length; i++) {
      if (city[i] !== '' || city[i] !== '+') cityFormated.push(city[i]);
    };

    let cityName = cityFormated.join("-");
    const ideaUrl = BASE_URL_HOME + "/idea/brochure.xhtml?id=" + id + "&title=" + cityName + "&lang=" + activeLang + "&currency=" + activeCurrency + "&agency=bookperfect"

    // render url
    if (ideaUrl) goToPage(ideaUrl, 'redirect');
  };

  // trip idea card
  const renderCard = (trip: any) => {
    return <TripIdeaCard className={''} key={trip.id} data={trip} OnTripIdea={(trip: any) => handleTripIdeas(trip)} />;
  };

  const classGenerator = (pathname: any) => {
    let className: any = null;
    switch (pathname) {
      case '/myprofile':
        return className = {
          global: 'my-0 mx-5 bigMd:mx-[0]',
          list: 'grid grid-cols-3 gap-4 mt-3 md:mt-5',
        }
      default:
        return className = {
          global: 'my-0 mx-5 bigMd:mx-[10.1vw]',
          list: 'grid grid-cols-2 gap-3 mt-3 md:mt-5',
        }
    }
    return className;
  }

  return (
    <div className="box-border h-[45rem] w-full p-4 bigMd:border-2 rounded-lg bigMd:bg-[#F4F8FF] dark:bg-transparent">
      <div className="text-base text-lg text-[#3944B3] font-poppins dark:text-[#fff]">My Ideas</div>

      <div className='w-full py-12'>
        <span className="text-[12px] text-base font-poppins dark:text-[#fff]">Search ideas</span>
        <HeroInputSearch searchStyle="w-full" lengthStyle="w-full" />
      </div>

      <CustomDivider />
      {
        data && data.length > 0 ?
          <>
            <div className={`w-full dark:bg-[#171925] z-[-1] md:mb-[165px] h-[25rem] overflow-y-scroll`} id={'scrollbarStyle'}>
              <div className={classGenerator(currentURL.pathname).global}>
                <div className={`trip-ideas w-full relative pt-8 pb-20 md:py-0`}>
                  <div className={classGenerator(currentURL.pathname).list} >
                    {data.map((stay: any) => renderCard(stay))}
                  </div>
                </div>
              </div>
            </div>
          </> :
          <NotFound />
      }

    </div>
  )
}

export default MyIdeas;