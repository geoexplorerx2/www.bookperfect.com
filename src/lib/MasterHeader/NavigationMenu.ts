import randomId from "../../common/randomId";
import { NavigationItemType } from "../../types/menus/menus";
import { ReactComponent as user } from "../../images/profileicons/user.svg";
import { ReactComponent as bookings } from "../../images/profileicons/bookings.svg";
import { ReactComponent as pendingpayments } from "../../images/profileicons/pendingpayments.svg";
import { ReactComponent as mydata } from "../../images/profileicons/mydata.svg";
import { ReactComponent as myideas } from "../../images/profileicons/myideas.svg";
import { ReactComponent as myholidays } from "../../images/profileicons/myholidays.svg";
import { ReactComponent as purchaseattempts } from "../../images/profileicons/purchaseattempts.svg";
import { ReactComponent as rewards } from "../../images/profileicons/rewards.svg";
import { ReactComponent as TripDesignerIcon } from "../../images/icons/TripDesignerIcon.svg";
import { ReactComponent as FlightsAndMoreIcon } from "../../images/icons/FlightsAndMore.svg";
import { ReactComponent as HotelsIcon } from "../../images/icons/HotelsIcon.svg";
import { ReactComponent as FLightsAndHotelsIcon } from "../../images/icons/FLightsAndHotelsIcon.svg";
import { ReactComponent as ActivitiesIcon } from "../../images/icons/Activities.svg";
import { ReactComponent as TransfersIcon } from "../../images/icons/TransfersIcon.svg";
import { ReactComponent as PackagesIcon } from "../../images/icons/PackagesIcon.svg";
import { ReactComponent as RentACarIcon } from "../../images/icons/RentACar.svg";
import BASE_URL_HOME from "../../api/env";

const useDL = true;

const profileDLURI: any = (item: string) => {
  switch (item) {
    case 'myprofile':
      return BASE_URL_HOME + '/profile/dashboard.xhtml?tripId=2';  
    case 'bookings':
      return BASE_URL_HOME + '/profile/dashboard.xhtml?tripId=2&selectedSection=BOOKINGS';
    case 'pendingpayments':
      return BASE_URL_HOME + '/profile/dashboard.xhtml?tripId=1&selectedSection=PAYMENTS';
    case 'myideas':
      return BASE_URL_HOME + '/profile/dashboard.xhtml?tripId=2&selectedSection=IDEAS';
    case 'purchaseattempts':
      return BASE_URL_HOME + '/profile/dashboard.xhtml?tripId=1&selectedSection=TEMPORAL_IDEAS';
    case 'myholidays':
      return BASE_URL_HOME + '/profile/dashboard.xhtml?tripId=2&selectedSection=HOLIDAY_PACKAGES';
    case 'mydata':
      return BASE_URL_HOME + '/profile/dashboard.xhtml?tripId=2&selectedSection=DATA';
      case 'rewards':
        return BASE_URL_HOME + '/profile/dashboard.xhtml?tripId=2&selectedSection=REWARDS_STATEMENT';
    default:
      break;
  }
};

const moreChildMenus: NavigationItemType[] = [
  // {
  //   id: randomId(),
  //   href: "/",
  //   name: "Blog",
  // },
  {
    id: randomId(),
    href: "/transfers",
    name: "Transfers",
    icon: TransfersIcon
  },
  {
    id: randomId(),
    href: "/packages",
    name: "Packages",
    icon: PackagesIcon
  },
  {
    id: randomId(),
    href: "/car-rental",
    name: "Rent a Car",
    icon: RentACarIcon
  },
  {
    id: randomId(),
    href: "/travelguide",
    name: "Travel Guide",
  },
  // {
  //   id: randomId(),
  //   href: "/packages",
  //   name: "Packages",
  // },
  // {
  //   id: randomId(),
  //   href: "/routing",
  //   name: "Routing",
  // },
  // {
  //   id: randomId(),
  //   href: "/transfers",
  //   name: "Transfers",
  // }
];

export const NAVIGATION_MENU: NavigationItemType[] = [
  {
    id: randomId(),
    href: "/tripdesigner",
    name: "Trip Designer",
    icon: TripDesignerIcon
    // type: "dropdown",
    // children: demoChildMenus,
    // isNew: true,
  },
  {
    id: randomId(),
    href: "/flights",
    name: "Flights & More",
    icon: FlightsAndMoreIcon
    // type: "dropdown",
    // children: templatesChildrenMenus,
  },
  {
    id: randomId(),
    href: "/hotels",
    name: "Hotels",
    icon: HotelsIcon
    // type: "dropdown",
    // children: templatesChildrenMenus,
  },
  {
    id: randomId(),
    href: "/flights-hotels",
    name: "Flights + Hotels",
    icon: FLightsAndHotelsIcon
    // type: "dropdown",
    // children: templatesChildrenMenus,
  },
  {
    id: randomId(),
    href: "/activities",
    name: "Activities",
    icon: ActivitiesIcon
    // type: "dropdown",
    // children: templatesChildrenMenus,
  },
  
  // {
  //   id: randomId(),
  //   href: "/routing",
  //   name: "Routing",
  // },
  {
    id: randomId(),
    href: "",
    name: "More",
    type: "dropdown",
    children: moreChildMenus,
  },
];

// profile menus items
export const profileMenus: NavigationItemType[] = [
  {
    id: randomId(),
    href: useDL ? profileDLURI('myprofile') : "/myprofile",
    name: "My Profile",
    icon: user
  },
  {
    id: randomId(),
    href: useDL ? profileDLURI('bookings') : "/bookings",
    name: "Bookings",
    icon: bookings
  },
  {
    id: randomId(),
    href: useDL ? profileDLURI('pendingpayments') : "/pendingpayments",
    name: "Pending Payments",
    icon: pendingpayments
  },
  {
    id: randomId(),
    href: useDL ? profileDLURI('myideas') : "/myideas",
    name: "My Ideas",
    icon: myideas
  },
  {
    id: randomId(),
    href: useDL ? profileDLURI('purchaseattempts') :"/mypurchaseattempts",
    name: "My Purchase Attempts",
    icon: purchaseattempts
  },
  {
    id: randomId(),
    href: useDL ? profileDLURI('myholidays') : "/myholiday",
    name: "My Holidays",
    icon: myholidays
  },
  {
    id: randomId(),
    href: useDL ? profileDLURI('mydata') :"/mydata",
    name: "My Data",
    icon: mydata
  },
  {
    id: randomId(),
    href: useDL ? profileDLURI('rewards') : "/rewards",
    name: "Rewards",
    icon: rewards
  }
];