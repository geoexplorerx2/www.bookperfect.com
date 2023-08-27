import { createStyles } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import CookieConsent, { Cookies } from "react-cookie-consent";
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from 'redux-persist/es/integration/react';
// import { Persistor } from "redux-persist/es/types";
import './App.css';
import { Footer, SectionBackground } from './components';
import HeaderActions from './components/HeaderActions/HeaderActions';
import Routers from './routers';
import store from './store';
import persistor from './store';
import history from './store/history';
import { goToPage } from './common/goToPage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from './routers/scrollToTop';
import ScrollToTopButton from './components/ScrollToTop/ScrollToTop';
import { initFacebookSdk } from './helpers';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import Notification from './components/Notification/Notification';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
// require('dotenv').config();

const useStyles = createStyles((theme) => ({
  root: {
    // backgroundColor: '#11284b',
    width: window.innerWidth,
  }

}));

function App() {

  const links = [
    {
      "link": "/",
      "label": "Trip Designer"
    },
    {
      "link": "/flights",
      "label": "Flights",
    },
    {
      "link": "/hotels",
      "label": "Hotels"
    },
    {
      "link": "/flights-hotels",
      "label": "Flights + Hotels"
    },
    {
      "link": "/activities",
      "label": "Activities"
    },
    {
      "link": "#2",
      "label": "More",
      "links": [
        {
          "link": "/blog",
          "label": "Blog"
        },
        {
          "link": "/packages",
          "label": "Packages"
        },
        {
          "link": "/routing",
          "label": "Routing"
        },
        {
          "link": "/transfers",
          "label": "Transfers"
        }
      ]
    }
  ];

  // const dispatch = useDispatch()
  const pathname = window.location.pathname;
  const { classes } = useStyles();
  const GA_TRACKING_ID: any = process.env.REACT_APP_GATRACKING_ID;
  const GTAG_MANAGER_ID: any = process.env.REACT_APP_GTAGMANAGER_ID;

  // history.listen((location: any) => {
  //   if (history.action === 'POP') {
  //     // window.history.go(-1);
  //   }
  // });

  // initFacebookSdk();
  ReactGA.initialize(
    GA_TRACKING_ID,
    {
      debug: true
    }
  );

  const tagManagerArgs = {
    gtmId: GTAG_MANAGER_ID
  };

  TagManager.initialize(
    tagManagerArgs
  );

  const isProduction = process.env.REACT_APP_PRODUCTION
  return (
    <Provider store={store}>
      {/* <PersistGate loading = { null } persistor = { persistor } >
        <ConnectedRouter history = { history }> */}
      <Notification isOpened={true} children={'hi buddy'} />

      <Router history={history}>
        {/* <div className={classes.root}> */}
        <ScrollToTop history={history} />
        <HeaderActions links={links} />
        <Routers />
        {/* {
                  isProduction && <Redirect to='/' />
                } */}
        {/* </div> */}
        {/* site footer */}
        <div className="relative">
          <SectionBackground className="bg-[#0E123D] dark:bg-black dark:bg-opacity-20 " />
          <Footer />
          <FloatingWhatsApp
            accountName={'Book Perfect'}
            phoneNumber={'+905321739818'}
          />

          <ScrollToTopButton />
        </div>
      </Router>

      {/* </ConnectedRouter>
      </PersistGate> */}
      {/* <CookieConsent
              location="bottom"
              buttonText="I understand"
              cookieName="myAwesomeCookieName2"
              style={{ background: "#2B373B" }}
              buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
              expires={150}
            >
              This website uses cookies to enhance the user experience.{" "}
              <span style={{ fontSize: "10px" }}></span>
            </CookieConsent> */}
    </Provider>

  );
};

export default App;
