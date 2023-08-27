import React, { FC } from 'react';
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core';
import ButtonSecondary from '../../lib/Button/ButtonSecondary';
import Heading from '../../lib/Heading/Heading';
import {useHistory} from 'react-router-dom'
import InternationalAirlines from '../InterationalAirlines/InternationalAirlines';
import { stripHtml } from '../../common/stripHtml';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface InformationProps{
  heading?: string;
  subHeading?: string;
  classStyle?: string;
  image?: any;
  statictext?: any;
};

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    // maxWidth: 480,
    // marginRight: theme.spacing.xl * 3,
    marginTop: window.location.pathname == '/' ? '10px' : '50px',
    marginLeft: '150px',
    

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
      marginLeft: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    // width: '50%',
    // height: '50%',
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

const Information: FC<InformationProps> = ({heading, subHeading, classStyle, image, statictext}) => {
  // check if we are on the flights page
  let history = useHistory()
  let isFlightsPage =  history.location.pathname === '/flights' 
  const { classes } = useStyles();
  // @ts-ignore
  const {t} = useTranslation()
  return (
    <div className={`mx-5 sm:px-[10vw] mt-8 md:-mt-[20px] md:pt-0 mb-16 pb-0 sm:mt-0 top-destinations dark:bg-[#202133] ${classStyle}`}>
    <div className={`flex justify-center ${isFlightsPage ? 'flex-col md:mt-0' : ''}`}>
      <Heading
        isCenter = {true}
        desc = { subHeading }
        className={'!w-auto'}
      >
        {heading}
      </Heading>
      <div className={`flex flex-col lg:flex-row w-full 
                       ${isFlightsPage ? 'justify-between items-center' :'justify-center' }`}>
        {/* <div className={classes.inner}> */}
          {/* <Image src={image} className={classes.image} /> */}
          <div 
            className={`w-full lg:w-[50%] max-w-[562px] ${isFlightsPage ? 'hidden md:inline-block':''}`}
          >
            <img className='w-[330px] xs:w-full' src={image} />
          </div>
          {isFlightsPage ? 
            <div className={`${classes.content} md:w-full lg:w-[50%] xl:max-w-[650px] flex flex-col justify-between mt-8 md:mt-[45px] md:ml-[37px] leading-[60px]`}  >
              <InternationalAirlines />
            </div>
          :
            <div className={`${classes.content} w-[327px] xs:w-auto lg:max-w-[50%] lg:w-[542px] flex flex-col justify-between mt-8 md:mt-[45px] md:ml-[37px] leading-[60px]`}  >
              <div className='text-lg leading-6 dark:text-white xl:text-[32px] 3xl:text-[2vw] xl:!leading-[48px] w-[300px] md:w-[542px]'>
               { statictext && statictext.bottom_hero_title ?
                                    // statictext.bottom_hero_title && stripHtml(statictext.bottom_hero_title) :
                                    <div dangerouslySetInnerHTML={{ __html: statictext.bottom_hero_title }} /> :
                                    <>
                                        Letraset sheets containing Ipsum 
                                        passages, and <span className='font-bold'>more recently 
                                        with </span> desktop publishin
                                    </>
                                     }
              </div>
              <Text mt="md" style={{fontFamily: 'Poppins'}} className={'dark:text-[#fefefe] dark:opacity-[85%] text-xs md:text-lg leading-[22px] md:leading-[27px] 3xl:txt-[1.1vw] 3xl:leading-[2rem]'}>
                { ( statictext && statictext.bottom_hero_description && stripHtml(statictext.bottom_hero_description) ) ?? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolore corporis iusto illo eaque earum fugiat eligendi et blanditiis tenetur culpa, nesciunt enim vero quidem praesentium facilis at sit ipsam.' }
                {/* { ( statictext && statictext.bottom_hero_description && <div dangerouslySetInnerHTML={{ __html: statictext.bottom_hero_description }} />  ) ?? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolore corporis iusto illo eaque earum fugiat eligendi et blanditiis tenetur culpa, nesciunt enim vero quidem praesentium facilis at sit ipsam.' } */}
              </Text>

              <Group mt={20} className="w-full">
                <span className="block flex-shrink-0 w-full">
                  <ButtonSecondary className="!leading-none ml-92 !rounded-2xl group border border-[#3944B3] dark:border-white dark:hover:border-[#3944B3] hover:border-[#F75847] min-w-[333px] md:min-w-[auto] md:w-full !h-[38px] lg:w-[167px] lg:!h-[40px] ">
                    <span className="text-[#3944B3] group-hover:text-[#F75847] dark:text-white dark:group-hover:text-[#3944B3] w-full">{t('MORE_INFO')}</span>
                    <i className="ml-3 las la-arrow-right text-xl text-[#3944B3] dark:text-white dark:group-hover:text-[#3944B3] group-hover:text-[#F75847]"></i>
                  </ButtonSecondary>
              </span>
              </Group>
          </div>
          
          }
         

        {/* </div> */}
      </div>
     </div>
    </div>
    // <div>
    //   <Container>
        // <div className={classes.inner}>
        
        //   <div className={classes.content}>
        //     <Text color="dimmed" mt="md">
        //       Build fully functional accessible web applications faster than ever – Mantine includes
        //       more than 120 customizable components and hooks to cover you in any situation
        //     </Text>

        //     <Group mt={30}>
        //       <span className="hidden sm:block flex-shrink-0">
        //         <ButtonSecondary className="!leading-none">
        //           <span>More Info</span>
        //           <i className="ml-3 las la-arrow-right text-xl"></i>
        //         </ButtonSecondary>
        //      </span>
        //     </Group>

        //   </div>

        //   <Image src={image} className={classes.image} />
        // </div>
    //   </Container>
    // </div>
  );
}

export default Information;