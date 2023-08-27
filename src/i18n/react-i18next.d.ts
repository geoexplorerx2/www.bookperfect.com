// import the original type declarations
import 'react-i18next';
// import all namespaces (for the default language, only)
import common from 'locales/en/common.json';
// import ns2 from 'locales/en/ns2.json';


// react-i18next versions lower than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface Resources {
    common: typeof common;
  }
}

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'common';
    // custom resources type
    resources: {
      common: typeof common;
    //   ns2: typeof ns2;
    };
  };
};