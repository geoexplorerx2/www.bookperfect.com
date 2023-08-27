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
import destinationdetail from '../../images/destinationdetail.png';

interface DestinationDetailProps{
  heading?: string;
  subHeading?: string;
  classStyle?: string;
  image?: any;
  taxonomy?: any;
  data?: any;
};

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 530,
    marginRight: theme.spacing.xl * 3,
    marginTop: window.location.pathname == '/' ? '10px' : '50px',
    marginLeft: '40px',
    

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

const DestinationDetail: FC<DestinationDetailProps> = ({classStyle = "", taxonomy, data}) => {
  const { classes } = useStyles();
  
  return (
    <div className={`${classStyle}`}>
     <div className={`flex px-5 bigMd:px-[10.1vw] lg:pl-0 lg:pr-[10.1vw] `}>

      <div className="flex flex-col lg:flex-row w-full justify-between">

          <div className="w-ful lg:w-[50%]">
            <img className='w-full rounded-3xl lg:rounded-none' src={destinationdetail} />
          </div>

          <div className={`py-4 px-5 lg:pr-0 w-full lg:w-[50%] flex justify-start flex-col text-center lg:text-left`}>
            <div className='text-lg lg:text-xl xl:text-[24px] text-[#3842B2] font-normal leading-[114%] dark:text-white '>
              {/* You're going to love your holiday to {taxonomy[taxonomy.length - 1]} */}
              {typeof data != 'string' && data && data.length > 0 ? (data[0].field_dd_title && data[0].field_dd_title.replace(/<\/?[^>]+(>|$)/g, ""))  : `You're going to love your holiday to ${taxonomy && taxonomy[taxonomy.length - 1] && taxonomy[taxonomy.length - 1].name}`}
            </div>

            <div className='mt-8 text-xs lg:leading-7 lg:text-sm  text-[#15173F] font-[300] font-poppins dark:text-[#fefefe] dark:opacity-[85%] line-clamp-6'>
              {/* Wandering along cobbled streets from Stockholm to Santorini, driving through vineyard-clad countryside in Province and Portugal, or cruising from ancient port cities along the Mediterranean to the Baltic, it’s a continental feast for the senses. Recline into holiday mode on sunny islands in the south, or venture into astonishing wilderness where Scandinavia enters the Arctic Circle in the north. Europe’s immense art, architecture, cuisine and culture mean there’s something new to explore, whether it’s your first or fifteenth visit.  */}
              { 
                typeof data != 'string' && data && data.length > 0 ? (data[0].field_dd_body && data[0].field_dd_body.replace(/<\/?[^>]+(>|$)/g, ""))  : 
                                                    "Wandering along cobbled streets from Stockholm to Santorini, driving through vineyard-clad countryside in Province and Portugal, or cruising from ancient port cities along the Mediterranean to the Baltic, it’s a continental feast for the senses. Recline into holiday mode on sunny islands in the south, or venture into astonishing wilderness where Scandinavia enters the Arctic Circle in the north. Europe’s immense art, architecture, cuisine and culture mean there’s something new to explore, whether it’s your first or fifteenth visit." 
              }
            </div>

          </div>

      </div>

     </div>
    </div>
  );
}

export default DestinationDetail;