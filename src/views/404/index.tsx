import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/errorpage.css";

import { Helmet } from 'react-helmet';

import error404 from '../../images/error404.png';

const ErrorPage = () => {
  const urlHistory = useHistory();

  const returnToHomepage = () => {
         urlHistory.push("/");
         window.location.reload();
  };

  return (
    <div className="errorMain bg-[#FFF9F9] flex flex-col">
       {/* homepage helmet */}
        <Helmet>
          <meta charSet="utf-8" />
          <title> Bookperfect || 404 </title>
        </Helmet>

      <div className="space-y-1 -mt-16">
         {/* w-[465px] font-poppins text-[#3944B3] leading-[63px] font-normal */}
        <span className="flex flex-col font-poppins text-[#3944B3] text-[42px] leading-[63px] font-normal  w-[465px] h-[63px]">
          Oops! Page not found.
        </span>
        <span className="flex flex-col items-center mx-auto font-poppins font-normal text-[18px] leading-[27px] text-[#666666]">
          We couldn’t find that page.
        </span>
      </div>

      <div className="errorPNF">
        {/* <span>404 - Page Not Found</span> */}
        <img src={error404} />
      </div>

      <div className="homePage cursor-pointer flex -mt-6" onClick={() => returnToHomepage()}>
        <span className="font-poppins text-sm font-medium h-[21px] w-[98px] leading-[21px] mt-3">
          Back to Home
        </span>
      </div>

    </div>
  );
};

export default ErrorPage;
