import React from 'react';

if (process.env.REACT_APP_PRODUCTION === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  whyDidYouRender(
    React, 
    {
      trackAllPureComponents: true,
      trackHooks: true,
      trackExtraHooks: [
        [
          require('react-redux/lib'), 
          'useSelector'
        ]
      ]
   }
  );
  
};