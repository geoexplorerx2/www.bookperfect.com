import React, { FC, useState, useEffect, useMemo } from 'react';
import { createStyles, Container, Title, Text, Button, Group, List, ThemeIcon, Grid } from '@mantine/core';
import HeaderActions from '../HeaderActions/HeaderActions';
import HeroInputSearch from '../HeroInputSearch/HeroInputSearch';
import HeroCardSearch from '../HeroSearch/HeroCardSearch';
import { Check } from 'tabler-icons-react';
import HeroCarousel from '../HeroCarousel/HeroCarousel';
import GalleryImageSlider from '../GaleryImageSlider/GalleryImageSlider';
import Slide from '../HeroCarousel/Slide';
import HomepageHeroSearch from '../HeroInputSearch/HomepageHeroSearch';
import styled, { css } from "styled-components";

import ban1 from '../../images/ban1.png';
import ban2 from '../../images/ban2.png';
import ban3 from '../../images/ban3.png';
import ban4 from '../../images/ban4.png';
import ban5 from '../../images/ban5.png';

import americamap from '../../images/americamap.svg';
import asiamap from '../../images/asiamap.svg';
import europemap from '../../images/europemap.svg';
import africamap from '../../images/africamap.svg';
import southamericamap from '../../images/southamericamap.svg';
import austriliamap from '../../images/austriliamap.svg';
import antarticamap from '../../images/antarticamap.svg';
import oceaniamap from '../../images/oceaniamap.svg';

import { isTemplateExpression } from 'typescript';
import { transaction } from 'mobx';

import { useSelector, useDispatch } from "react-redux";

import { FIXLAYOUT } from "../../store/actions/layoutcontroller";
import { Namespace, useTranslation } from 'react-i18next';
import { continent, searchDestination } from '../../store/actions/TravelguideActions';
import StringToBoolean from '../../common/StringToBoolean';


const LiveIfAsClassWrapper = styled.div`
  //styleName: h4/light;
  font-family: Poppins;
  font-size: 28px;
  font-weight: 300;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  
  @media only screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    display: inline-block;
    font-weight: 500;
  }
`;

const ParadiseClassWrapper = styled.div`
  //styleName: h1/bold;
  font-family: Poppins;
  font-weight: 700;
  line-height: 78px;
  letter-spacing: 0em;
  text-align: left;
  @media only screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    display: inline-block;
    font-weight: 700;
  }
  
`;

const DescriptionClassWrapper = styled.div`
  //styleName: body2/light;
  font-family: Poppins;
  font-size: 15px;
  font-weight: 300;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color:#000;
  overflow-y: hidden;

  
  @media only screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 22px;
    font-weight: 300;
  }
  @media only screen and (max-width: 1100px) {
    max-height: 84px;
  }

 

`;
const Carousel = styled.div`
    position:absolute;
    right:0;
    width:50%;
    height:50%;
    z-index:0
`;

interface HeroHeaderProps {
  currentTab: any;
  statictext: any;
};

const useStyles = createStyles((theme) => ({
  root: {
    // backgroundColor: '#11284b',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // backgroundImage: url('../../images/banner.png'),
    paddingTop: theme.spacing.xl * 3,
    paddingBottom: theme.spacing.xl * 3,
    width: window.innerWidth,
    marginTop: '20px'
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    // fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    //   color: theme.white,
    //   fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    //   fontWeight: 700,
    //   lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 44,
    //marginTop: '20px',
    marginLeft: '35px',

    //   [theme.fn.smallerThan('md')]: {
    //     maxWidth: '100%',
    //     fontSize: 34,
    //     lineHeight: 1.15,
    //   },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  inputsearch: {
    marginTop: '30px'
  },

  cardsearch: {
    // marginTop: window.screen.height,
    // paddingTop: theme.spacing.xl * 3,
    // width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',

    // filter: 'drop-shadow(0px 6px 32px rgba(255, 197, 191, 0.28))'
    // display: 'flex',
    // paddingBottom: theme.spacing.xl * 3,
  },

  description: {
    color: theme.black,
    opacity: 1,
    maxWidth: 600,
    marginLeft: '35px',

    [theme.fn.smallerThan('md')]: {
      maxWidth: '50%',
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    // paddingTop: theme.spacing.xl * 4,
    // paddingBottom: theme.spacing.xl * 4,

    [theme.fn.smallerThan('md')]: {
      // flexDirection: 'column',
    },
  },

  content: {
    maxWidth: '50%',
    marginRight: theme.spacing.xl * 3,
    // maxHeight: '100%',

    // [theme.fn.smallerThan('md')]: {
    //   maxWidth: '100%',
    //   marginRight: 0,
    // },
    [`@media (max-width: 870px)`]: {
      maxWidth: '100%',
      marginRight: 0,
    }
  },

}));

const HeroHeader: FC<HeroHeaderProps> = ({ currentTab, statictext }) => {
  const { classes } = useStyles();
  // @ts-ignore
  const { t, i18n } = useTranslation();

  const layout = useSelector((state: any) => state.LayoutReducer);
  const LightMode = useSelector((state: any) => state.LightMode);
  const searchdestination = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.searchdestination);
  const continentData = useSelector((state: { TravelguideReducer: any; }) => state.TravelguideReducer.continent);

  const search = process.env.REACT_APP_USE_ALGOLIA_SEARCH;

  const [currentSlide, setCurrentSlide] = useState<any>(0)
  const [choose, setchoose] = useState<any>(null)
  const [fade, setFade] = useState<any>('fadeOut')

  const dispatch = useDispatch();

  // get continent data
  useEffect(() => {
    dispatch(
      searchDestination('')
    );
  }, []);

  // get travelguide resources
  useEffect(() => {
    // get continent from drupal
    if (!continentData) {
      dispatch(
        continent()
      );
    }
  }, [continentData]);

  useEffect(() => {
    if (choose != null) {
      setTimeout(() => {
        setchoose(null)
      }, 2000);
    };

    // setTimeout(() => {
    //   (currentSlide < 4) ? setCurrentSlide(currentSlide + 1) : setCurrentSlide(0)
    // }, 3000);

  }, [currentSlide, choose]);

  // search data with drupal search
  const CONTINENT_DATA = useMemo(() => {

    searchdestination &&
      searchdestination.length &&
      searchdestination?.forEach((continent: any) => {


        if (!continent.hasOwnProperty('map')) {

          if (continent.continent_name.toLowerCase() == 'europe') continent.map = europemap;
          else if (continent.continent_name.toLowerCase() == 'asia') continent.map = asiamap;
          else if (continent.continent_name.toLowerCase() == 'north america') continent.map = americamap;
          else if (continent.continent_name.toLowerCase() == 'africa') continent.map = africamap;
          else if (continent.continent_name.toLowerCase() == 'south america') continent.map = southamericamap;
          else if (continent.continent_name.toLowerCase() == 'australia') continent.map = austriliamap;
          else if (continent.continent_name.toLowerCase() == 'antarctica') continent.map = antarticamap;
          else if (continent.continent_name.toLowerCase() == 'oceania') continent.map = oceaniamap
          else {
            // continent.map = europemap;
          }

        }
      });

    return searchdestination;

  }, [searchdestination]);

  //  search data with algolia search
  const SEARCH_DATA = () => {
    const searchdata = StringToBoolean(search) ? searchdestination : CONTINENT_DATA;
    const hassearchquery = searchdestination?.query != '';
    const continentdata = StringToBoolean(search) && ((!hassearchquery && continentData) ?? [] );

    return {
      searchdata,
      hassearchquery,
      continentdata
    }
  };

  const [CarouselData, setCarouselData] = useState<any>([
    {
      image: 'https://bookperfect.imgix.net/carousel/banner4v2.png'
    },
    {
      image: 'https://bookperfect.imgix.net/carousel/banner3v2.png'
    },
    {
      image: 'https://bookperfect.imgix.net/carousel/banner2v2.png'
    },
    {
      image: 'https://bookperfect.imgix.net/carousel/banner1v2.png'
    },
    {
      image: 'https://bookperfect.imgix.net/carousel/banner5v2.png'
    }
  ]);

  const CarouselFunction = () => {
    return (
      <>

        <div className='absolute right-0  w-[50%] h-[100%] hidden z-[0] top-0 bigMd:flex justify-center items-center'>
          {
            (choose != null) ? <img className={`w-[100%] h-[100%] absolute`} src={CarouselData[choose].image} style={{ borderTopLeftRadius: '50px' }} /> :
              <img className={`w-[100%] h-[100%] z-[9] absolute ${fade}`} src={CarouselData[currentSlide].image} style={{ borderTopLeftRadius: '50px' }} />
          }

        </div>

      </>
    )
  }

  const slideSelection = () => {

    const setCurrent = (data: any) => {
      setchoose(data)
    }

    return (
      <>
        <ul className='flex p-1 relative justify-start items-center'>
          {CarouselData?.map((item: any, index: any) => {
            return (
              <li key={index} className="">
                <img
                  //  className='mx-1 my-[0.1vw] w-[3vw] h-[3vw] rounded-[.6vw] hover:h-[3.5vw] hover:w-[3.5vw] cursor-pointer'
                  className={(index == currentSlide) ?
                    "mx-1 my-[0.1vw] w-[3.5vw] h-[3.5vw] rounded-[.6vw] hover:h-[3.5vw] hover:w-[3.5vw] cursor-pointer" :
                    "mx-1 my-[0.1vw] w-[3vw] h-[3vw] rounded-[.6vw] hover:h-[3.5vw] hover:w-[3.5vw] cursor-pointer"
                  }
                  src={item.image}
                  onClick={() => setCurrent(index)}
                />
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  let maingWidth = '';
  let CarouselWidth = 'min-h-[490px]';
  if (layout.status == 'Flights') {
    maingWidth = '';
    CarouselWidth = 'min-h-[490px]'
  }
  if (layout.status == 'Hotels') {
    maingWidth = '';
    CarouselWidth = 'min-h-[490px]';
  }
  if (layout.status == 'Flights + Hotels') {
    maingWidth = '';
    CarouselWidth = 'min-h-[490px]'
  }
  if (layout.status == "Activities") {
    maingWidth = '';
    CarouselWidth = 'min-h-[490px]'
  }
  if (layout.status == "Packages") {
    maingWidth = '';
    CarouselWidth = 'min-h-[490px]';
  }
  if (layout.status == 'Transfers') {
    maingWidth = '';
    CarouselWidth = 'min-h-[490px]';
  }
  if (layout.status == "Routing") {
    maingWidth = '';
    CarouselWidth = 'min-h-[490px]';
  }
  if (layout.status == "oneWay") {
    maingWidth = '';
    CarouselWidth = 'min-h-[490px]';
  }
  if (layout.status == "roundTrip") {
    maingWidth = '';
    CarouselWidth = 'min-h-[490px]';
  }


  return (
    <div

      className={`${maingWidth} ${(LightMode.mode === 'dark') ? 'hero-head-search-dark md:min-h-[700px]' : 'hero-head-search'} md:min-h-[700px] z-10`}>
      <div style={{ opacity: '1', }}
        className={`absolute right-0 w-[30%] hidden z-[10] mr-[10.1vw] bigMd:flex justify-center ${CarouselWidth}`}>
        <div className={localStorage.getItem('theme') == 'dark' ? "absolute bottom-0 right-0 bg-[#171925] rounded-[1vw]" : "absolute right-0 bottom-0 bg-[#fff] rounded-[1vw]"}>
          {slideSelection()}
        </div>
      </div>
      {CarouselFunction()}

      <Container className='mx-2 md:mx-[9.1vw] max-w-full py-0 md:py-[50px]' size="lg"
      //  style={{ maxWidth: '100%', padding: '50px 0' }}
      >
        {/* {?} */}
        <div className={`${classes.inner}`}>
          <div className={classes.content}>
            <div style={{ marginTop: '20px', fontSize: '52px', color: localStorage.getItem('theme') == 'dark' ? '#fff' : '#F75847', fontWeight: 'lighter' }}>

            </div>
            <Title className={`${classes.title} mx-0`} >
              <Text
                component="span"
                inherit
                color={localStorage.getItem('theme') == 'dark' ? '#fff' : '#F75847'}
              >
                <ParadiseClassWrapper className='sm:text-[5.8vw] md:text-[5vw] xl:text-[4vw] 2xl:text-[3vw] text-3xl inline  whitespace-normal xl:whitespace-nowrap'>
                  <LiveIfAsClassWrapper>
                    {/* {t("liveas")} */}
                    {statictext && statictext.live_as_if}
                  </LiveIfAsClassWrapper>
                  <span className='tracking-[0.17rem] uppercase whitespace-normal xl:whitespace-nowrap' style={{ color: localStorage.getItem('theme') == 'dark' ? '#fff' : '#F75847' }}> {statictext && statictext.the_paradise} </span>
                </ParadiseClassWrapper>

              </Text>
            </Title>

            <Text className={`${classes.description} mx-0 flex bigMd:w-[40vw]`} >
              <DescriptionClassWrapper>
                <span style={{ color: localStorage.getItem('theme') == 'dark' ? '#fff' : '#0E123D' }}>
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque inventore soluta maxime veniam? */}
                  {statictext && statictext.header_description}
                </span>
              </DescriptionClassWrapper>
            </Text>

            <div>
              <HeroInputSearch
                type="search"
                isAnimated
                data={SEARCH_DATA()}
                statictext={statictext && statictext}
                lengthStyle={'max-w-2xl mx-auto max-h-[100%] h-[100px] pr-4'}
              />
              {/* <HomepageHeroSearch /> */}
            </div>
          </div>

          {/* <div className={classes.image}>
            <HeroCarousel>
              <Slide />
              <Slide />
            </HeroCarousel>
          </div> */}

        </div>
      </Container>
      <div
        // style={{ position: 'absolute', bottom: '0', width: '100%' }}
        className={`${classes.cardsearch} relative mb-0 md:absolute md:px-0 md:bottom-0 w-full mt-2 md:mt-[90px]`}
      // style = {{filter: 'drop-shadow(0px 6px 32px rgba(255, 197, 191, 0.28))'}}
      >
        {/* <HeroCardSearch /> */}
        <div>
          <HomepageHeroSearch currentTab={currentTab} scrollButtonClassNames='sm:hidden' pl='!px-2 lg:!px-11' />
        </div>

      </div>
    </div>
  );
};

export default HeroHeader;