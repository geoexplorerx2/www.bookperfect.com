/* eslint-disable */
const prod = "https://cms.hitrooms.com";
const test = "https://test.hitrooms.com";
const migration = "https://migration.hitrooms.com";

export const CUSTOM_BASE_URL = test + "/";
export const CUSTOM_BASE_URL_TEST = "http://18.184.52.154/";
export const SUPPORT_URL='https://api.hitrooms.com/geo-code?address='
export const AVUXI_BASE_URL = 'https://m.avuxicdn.com/v3/s/639aee80a904e838e65ed382/en';
export const ALGOLIA_BASE_URL = 'https://4ujiikxjjp-dsn.algolia.net/1/indexes/dev_destination_index';

// bookperfect cloud
const BASE_URL_HOME = "https://booking.bookperfect.com";

// TODO: get all keys from .env variables
// export const MAILCHIMP_API_URL = `https://hotelistan.us12.list-manage.com/subscribe/post?u=${process.env.MAILCHIMP_U}&id=${process.env.MAILCHIMP_ID}`;
// export const MAILCHIMP_API_URL = `https://hotelistan.us12.list-manage.com/subscribe/post?u=56382b8fdb70c65717ed798da&id=5ae42ee293`;
export const MAILCHIMP_API_URL = `https://bookperfect.us21.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;

export const EXTERNAL_EP_URL = (api_type: any, geocode: any = '') => {
  switch (api_type) {
    case 'countries':
        return 'https://restcountries.com/v3.1/all'; 
    case 'cityweather':
      return `https://api.openweathermap.org/data/2.5/weather?lat=${geocode.lat}&lon=${geocode.lng}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;
    default:
        break;
  }
};

const env = test;

export const BASE_URL =`${env}/`;
export default BASE_URL_HOME;

/* eslint-disable */
