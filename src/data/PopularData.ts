import popularparisImg from '../images/popularparisImg.svg';
import popularnewyorkImg from '../images/popularnewyorkImg.svg';
import populartokyoImg from '../images/populartokyoImg.svg';
import popularlondonImg from '../images/popularlondonImg.svg';

export const PopularData: any[] = [
    {
      name: "Paris",
      tid: 14774,
      image: popularparisImg,
      continent_name: "Europe",
      continent_tid: "1075",
      country_name: "France",
      country_tid: "1123",
      button: [
        {
            tid: 14774,
            type: 'deals',
            name: 'Travel Deals',
            icon: 'deals'
        },
        {
            tid: 14774,
            nid: 92329,
            type: 'guide',
            name: 'Travel Guide',
            icon: 'guide'
        }
      ]
    },
    {
        name: "New York",
        tid: 131123,
        image: popularnewyorkImg,
        continent_name: "North America",
        continent_tid: "1076",
        country_name: "United States",
        country_tid: "122605",
        button: [
          {
             tid: 131123,
             type: 'deals',
             name: 'Travel Deals',
             icon: 'deals'
          },
          {
             tid: 131123,
             nid: 143813,
             type: 'guide',
             name: 'Travel Guide',
             icon: 'guide'
          }
        ]
      },
      {
        name: "Tokyo",
        tid: 1084,
        image: populartokyoImg,
        continent_name: "Asia",
        continent_tid: "1073",
        country_name: "Japan",
        country_tid: "1079",
        button: [
          {
              tid: 1084,
              type: 'deals',
              name: 'Travel Deals',
              icon: 'deals'
          },
          {
              tid: 1084,
              nid: 88870,
              type: 'guide',
              name: 'Travel Guide',
              icon: 'guide'
          }
        ]
      },
      {
        name: "London",
        tid: 1099,
        image: popularlondonImg,
        continent_name: "Europe",
        continent_tid: "1075",
        country_name: "United Kingdom",
        country_tid: "1083",
        button: [
          {
              tid: 1099,
              type: 'deals',
              name: 'Travel Deals',
              icon: 'deals'
          },
          {
              tid: 1099,
              nid: 8,
              type: 'guide',
              name: 'Travel Guide',
              icon: 'guide'
          }
        ]
      }
  ];
  
  export const POPULAR_COUNTRIES_CONTINENT_ID = 1075;