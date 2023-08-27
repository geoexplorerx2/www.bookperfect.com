import React, { FC, useEffect, useMemo } from "react";
import Glide from "@glidejs/glide";
import { useDispatch, useSelector } from "react-redux";
// import { ReactComponent as Arrow } from '../../images/icons/arrow-right.svg'
import { ReactComponent as Arrow } from '../../images/icons/SliderArrow.svg'
import { TaxonomyType } from "../../data/types";
import Heading from "../../lib/Heading/Heading";
import { useHistory } from 'react-router-dom';
import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';
import img4 from '../../images/tripidea.png';
import img5 from '../../images/sydny.jpg';
import img6 from '../../images/img10.jpg';



import { CardCategory1, CardCategory2, CardCategory3, CardCategory4 } from "../CardCategory";
import { countries } from "../../store/actions";

export interface TopInternationalDestinationsProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingClassNames?: string;
  headingWrapperClassNames?: string;
  subHeading?: string;
  subheadingClassNames?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card1" | "card2" | "card3" | "card4";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  uniqueClassName: string;
  isHeadingCenter: boolean;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/search/flight/taxonomy",
    name: "Nature House",
    taxonomy: "category",
    count: 17288,
    thumbnail:
      "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/search/flight/taxonomy",
    name: "Wooden house",
    taxonomy: "category",
    count: 2118,
    thumbnail:
      "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/search/flight/taxonomy",
    name: "Houseboat",
    taxonomy: "category",
    count: 36612,
    thumbnail:
      "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/search/flight/taxonomy",
    name: "Farm House",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "6",
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "6",
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "6",
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "6",
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];
const thumbnail = [
  {
    id: "1",
    City: "London",
    Country: 'United Kingdom',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img1,
  },
  {
    id: "2",
    City: "Amesterdom",
    Country: 'Netherlands',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img2,
  },
  {
    id: "3",
    href: "/search/flight/taxonomy",
    City: "Barcelona",
    Country: 'Spain',
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img3,
  },
  {
    id: "4",
    City: "Rome",
    Country: 'Italy',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img4,
  },
  {
    id: "5",
    City: "Munich",
    Country: 'Germany',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img5,
  },
  {
    id: "6",
    City: "Paris",
    Country: 'France',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img6,
  },
  {
    id: "7",
    City: "Manchester",
    Country: 'United Kingdom',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img3,
  },
  {
    id: "8",
    City: "Belfast",
    Country: 'United Kingdom',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img4,
  },
  {
    id: "9",
    City: "Madrid",
    Country: 'Spain',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img6,
  },
  {
    id: "10",
    City: "Berlin",
    Country: 'Germany',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img2,
  },
  {
    id: "11",
    City: "Edinburgh",
    Country: 'United Kingdom',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img1,
  },
  {
    id: "12",
    City: "Athens",
    Country: 'Greece',
    href: "/search/flight/taxonomy",
    name: "Dome House",
    taxonomy: "category",
    count: 188288,
    thumbnail:img4,
  },
];

const TopInternationalDestinations: FC<TopInternationalDestinationsProps> = ({
  heading = "Heading of sections",
  headingClassNames,
  subHeading = "Descriptions for sections",
  headingWrapperClassNames,
  subheadingClassNames,
  className = "",
  itemClassName = "",
  categories = DEMO_CATS,
  itemPerRow = 5,
  isHeadingCenter,
  categoryCardType = "card1",
  sliderStyle = "style1",
  uniqueClassName,
}) => {
  const UNIQUE_CLASS = "TopInternationalDestinations__" + uniqueClassName;
  
  
  const history = useHistory()
  const isOnTravelGuidePage = history.location.pathname == '/travelguide'
  const isOnflightsPage = history.location.pathname == '/flights' 
  let isActivitiesPage = history.location.pathname == '/activities'
  const dispatch = useDispatch();
  const countriesData = useSelector((state: { countries: object; }) => state.countries);

  // const countries = services.getCountries().then((res: any) => console.log(res));

  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: itemPerRow,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 4,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS, UNIQUE_CLASS]);

  // get countries
  // useEffect(() => {
  //   dispatch(
  //     countries()
  //   );
  // }, []);


  const renderCard = (item: TaxonomyType, index: number) => {
    switch (categoryCardType) {
      case "card1":
        return <CardCategory1 taxonomy={item} cardHeight="h-full" roundedCard="rounded-full" truncatePosition="mx-auto" />;
      case "card2":
        return <CardCategory2 taxonomy={item} />;
      case "card3":
        return <CardCategory3 taxonomy={item} />;
      case "card4":
        return <CardCategory4 taxonomy={item} />;
      default:
        return <CardCategory1 taxonomy={item} />;
    }
  };
  // const history = useHistory();
  const pathname = history.location.pathname;
  return (
    <div className={`mx-[10vw] top-international-destinations relative z-10 ${className}`}
    // style={{width: '75%'}}
    >
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
          isCenter={isHeadingCenter}
          desc={subHeading}
          headingWrapperClassNames={`${headingWrapperClassNames} !text-[18px] md:!text-[32px] font-normal`}
          subheadingClassNames={`${subheadingClassNames} text-[#15173F]`}
          // subheadingClassNames={`${isOnflightsPage ? '!text-[#0E123D]' : '!text-[#BDC3FF]'}  
          // ${isActivitiesPage ? '!text-[#15173F]' : ''}
          // ${isOnTravelGuidePage ? '!text-[#0E123D]' : ''}
          // !text-[#BDC3FF]
          // `}

        >
          <span
          //  className={`${pathname == '/travelguide' ? 'text-[#15173F] text-[24px] pl-5' : 'text-[#fff]'}`}
           className={`${headingClassNames} text-[#15173F] dark:text-white text-[24px]`}
           >{heading}</span>
        </Heading>
        {pathname == '/travelguide' ?
          <div className="glide grid grid-cols-6 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 min-h-[20vh]">
            {
              thumbnail.map((item: any, index: any) => (
                <div className="w-[220px] h-[330px] mx-4">
                  <div className="w-[100%] h-[100%]">
                    <img className="w-[100%] h-[70%] rounded-xl" src={item.thumbnail} />
                    <div className="mt-3 mx-5 text-[#15173F] font-semibold">{item.City}</div>
                    <div style={{lineHeight:'20px'}} className="mx-5 font-thin text-[rgba(0,0,0,0.6)]">{item.Country}</div>
                  </div>
                </div>
              ))
            }
          </div>

          :
          <div className='glide'>
            <div className={`glide__track min-w-full`} data-glide-el="track">
              <ul className={`glide__slides ${isOnflightsPage ? 'py-16' : ''}`}>
                {categories.map((item, index) => (
                  <li key={index} className={`glide__slide ${itemClassName}`}>
                    {renderCard(item, index)}
                  </li>
                ))}
              </ul>
            </div>
            <div className='glide__arrows' data-glide-el='controls'>
              <button
                className='glide__arrow glide__arrow--prev absolute bottom-1/2 left-0 translate-x-[-100%] md:translate-x-[-120%]'
                data-glide-dir='<'
              >
                <Arrow className="arrow-left w-8 h-8 text-white" />
              </button>
              <button
                className='glide__arrow glide__arrow--next absolute bottom-1/2 right-0 translate-x-[100%] md:translate-x-[120%]'
                data-glide-dir='>'
              >
                <Arrow className="arrow-left w-8 h-8 rotate-180 text-white" />
              </button>
            </div>
          </div>

        }


      </div>
    </div>
  );
};

export default TopInternationalDestinations;
