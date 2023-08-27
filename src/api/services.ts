import { resolve } from "path";
import { Cookies } from "react-cookie";
import Logger from "../common/Logger";
import {
    AGENCY_ID,
    MICROSITE_ID,
    SUPPLIER_ID
} from "../constants/suppliers";
import history from "../store/history";
import { HTTPResponse } from "../types/api/api";
import { ALGOLIA_BASE_URL, EXTERNAL_EP_URL } from "./env";
import {
    del,
    get, post
} from "./request";
import StringToBoolean from "../common/StringToBoolean";

const cookie = new Cookies();
const accessToken = cookie.get("access_token");
class Services {

    // travel guides: destinations continent
    public getContinent = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                // url: "rest/destinations?type=continent",
                url: "rest/continents",
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // travel guides: destinations country TERM
    public getCountries = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: "rest/destinations?type=country",
                // mode: 'no-cors'
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // travel guides: airlines resource
    public getAirlinesResource = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: "rest/airlines",
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // travel guides: destinations resource
    public getDestinationsResource = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: "rest/apidestinations",
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // travel guides: informations node
    public getInformationsNode = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: "rest/informations?destination=8&langcode=en",
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // travel guides: subtopics term
    public getSubtopicsTerm = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: "rest/subtopics",
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // travel guides: help types
    public getHelpTypesTerm = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: "rest/help-types",
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // travel guides: help articles
    public getHelpArticles = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: "rest/help-articles?type=47",
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // travel guides: help articles
    public getSearchNode = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: "rest/search?combine=istanbul",
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // travel guides: subtopics paragraph
    public getSubtopicsParagraph = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: "rest/info-subtopics?parent_id=54",
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // test : resources/autocomplete/bookperfect/hotelDestination
    // public getAutocomplete = (): Promise<any> => {
    //     return new Promise((resolve, reject) => {
    //         return get({
    //             url: "/jsonp/locationSearch?callback=?&tripType=ONLY_HOTEL&byCode=true",
    //             // body: {
    //                 // query: 'ist',
    //                 // micrositeId: 'bookperfect',
    //                 // languageId: window.languageId,
    //                 // destinationCountries: destinationCountries
    //             // }
    //         }).then(resolve).catch(this.handleError.bind(null, reject));
    //     });
    // };

    // rest/cities?continent=
    public getContinentCities = (continent_tid: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: `rest/cities?continent=${continent_tid}`,
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get countries of continent
    public getContinentCountries = (continent_tid: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: `rest/countries?continent=${continent_tid}`,
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    public getCountryCities = (country_id: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: `rest/cities?country=${country_id}`,
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    public getCityData = (city_id: any, currency: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                // url: `rest/city-detail?tid=${city_id}`,
                url: `rest/destination-detail?tid=${city_id}&currency=${currency}`,
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    public getGuideData = (guide_id: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: `rest/info-subtopics?parent_id=${guide_id}`,
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    public getDestinationDetail = (destination_id: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: `rest/destination-detail?tid=${destination_id}`,
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // auth
    // signin
    public signIn = (username: string, password: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            return post({
                url: `rest-api/login`,
                body: {
                    username: username,
                    password: password
                }
                // url: `/resources/authentication/getAuthToken?microsite=bookperfect&username=${username}&password=${password}`,
                // url: `/P1/public/auth/bookperfect/${username}/${password}`
                // url: `rest-api/get__user/${username}/${password}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // signup
    public signUp = (new_user: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            return post({
                url: `rest-api/register`,
                // url: `rest-api/create__user/bookperfect/bookperfect`,
                body: new_user
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // signout
    public signOut = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            return del({
                url: '/authentication/authenticate',
            }, 'travelcompositor').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // authenticated
    public isAuthenticated = (): Promise<HTTPResponse> => {
        return new Promise((resolve, reject) => {
            get({
                url: '/authentication/authenticate',
            }, 'travelcompositor').then(resolve).catch(reject);
        });
    };

    ///////

    // api 2
    // travel guides: destinations country TERM
    public getContinentsCountries = (continent: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            return get({
                url: `api/arpanu/dest?continent=${continent}`,
                // mode: 'no-cors'
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // user data : travel compositor
    public getUserData = (username: string): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/user/${AGENCY_ID}/${username}`
                // url: `/resources/user/bookperfect/bookperfect/${username}`
                // url: `rest-api/get__user_id/${username}/${accessToken}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        }
        )
    };

    public getCSRFToken = (): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: 'rest-api/get__csrf'
            }, 'customapi').then((response: any) => {
                // console.log({response});
                // this.setCSRFTokenCookie()
            }).catch(this.handleError.bind(null, reject));
        })
    }

    // get csrft
    private setCSRFTokenCookie(value: any): void {
        this.removeCSRFTokenCookie();
        cookie.set("csrf_token", value, { path: "/" });
    };

    // remove csrft
    private removeCSRFTokenCookie(): void {
        cookie.remove("csrf_token", { path: "/" });
    };

    // user data : custom api
    public getUsersData = (username: string): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `api/arpanu/GetUser?username=${username}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        }
        )
    };

    // activities data
    public getActivities = (): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/ticket/${SUPPLIER_ID}`
                // url: `rest-api/get__ticket_supplierid/7650`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        }
        )
    };

    // activities data by id
    public getActivitiesById = (req: any): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/ticket/${SUPPLIER_ID}/${req.activity_id}`
                // url: `rest-api/get__ticket/7650/${req.activity_id}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get travel compositor public token 
    // public getPublicToken = (data: any): Promise<any> => {
    //     return new Promise<any>((resolve, reject) => {
    //         return get({
    //             url: `/authentication/getAuthToken?microsite=${data.micrositeId}&username=${data.username}&password=${data.password}`
    //         }, 'travelcompositor').then(resolve).catch(this.handleError.bind(null, reject));
    //     }
    //  ) 
    // };

    // get trip ideas packages data
    public getTripIdeas = (req: any): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/travelidea?currency=${req.currency}&lang=${req.lang}` // migrated
                // url: `rest-api/get__ideas/${req.lang}/${req.currency}/${req.countryCode}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        }
        )
    };

    // get trip ideas packages data
    public getTripIdeasById = (req: any): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/travelidea/info/${req.ideaId}?currency=${req.currency}&lang=${req.lang}` // migrated
                // url: `rest-api/get__travelidea_ideaid_lan_currency/${req.ideaId}/${req.lang}/${req.currency}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        }
        )
    };

    // get hotels data
    public getHotels = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/hotels/${SUPPLIER_ID}` // migrated
                // url: 'rest-api/get__hotel/7650'
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get hotel by provider code, data
    public getHotelByProvider = (providerCode: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/get__hotel_supplierid_provider_code/7650/${providerCode}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get transports data
    public getTransports = (currency: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                // url: `rest-api/get__transport/7650/${currency}`
                url: `rest/transports`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get transports data by ids
    public getTransportById = (req: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/transports?transport_id=${req.transport_id}` // migrated
                // url: `rest-api/transport/${SUPPLIER_ID}/${req.transport_id}` // migrated
                // url: `rest-api/get__transport_id/7650/${req.transport_id}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get accomodations data
    public getAccomodations = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: 'rest-api/accommodations'
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // migrated
    public getAccomodationById = (accomodationId: any, lang: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/accommodations/detail/${accomodationId}?lang=${lang}`
                // url: `rest-api/get__accommodations__by__id/${accomodationId}/${lang}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    public getAllDestination = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: 'rest-api/get__destination__all'
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    public getDestinationByCode = (city_code: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/get__destination__by_code/${city_code}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // https://restcountries.com/v3.1/all
    public getAllExternalEPCountries = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: EXTERNAL_EP_URL('countries')
            }, 'external__api').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    public getTransfer = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/transfers/${SUPPLIER_ID}`
                // url: 'rest-api/get__transfer/7650'
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // transfers by id
    public getTransferById = (req: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/transfers/${SUPPLIER_ID}/${req.transfer_id}`
                // url: `rest-api/get__transfer_supplierid_transferid/7650/${req.transfer_id}`,          
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    public getHotelsByCity = (city: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/get__TripIdeasCategoriesHotelten__by__name/${city}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // search destination
    public getSearchDestination = (query: string) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: StringToBoolean(process.env.REACT_APP_USE_ALGOLIA_SEARCH) ? (ALGOLIA_BASE_URL + `?query=${query}`) : `rest/search-city?search=${query}`
            }, StringToBoolean(process.env.REACT_APP_USE_ALGOLIA_SEARCH) ? 'algolia' : 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get company information: about
    public getAbout = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/page?nid=160561`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get jobs
    public getJobs = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/jobs`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get company data
    public getCompany = (lang: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/company?lang=${lang}`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get helps types
    public getHelpsTypes = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/help-types`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get all exclusive offers
    public getExclusiveOffers = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/exclusive-offer/offer`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        })
    };

    // get all bookings
    public getBookings = (startdate: any, enddate: any, lang: any = 'en') => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/booking?from=${startdate}&to=${enddate}&lang=${lang}` // migrated
                // url: `rest-api/get__Booking_all/${startdate}/${enddate}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get all trip ideas history
    public getTripIdeasHistory = (username: string) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `/rest-api/travelidea/?&username=${username}&onlyVisible=false`
                // url: `rest-api/get_ideaspackages/${username}/false`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get social login links
    public getSocialLoginSdk = (redirect_url: string) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `social-login/links?redirect_uri=${redirect_url}`
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // // get social login links
    public getUserProfileWithToken = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest-api/profile`,
                request_user_profile: true
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get city weather data
    public getCityWeatherData = (geococde: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: EXTERNAL_EP_URL('cityweather', geococde)
            }, 'external__api').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };
    // get faqs
    public getFAQS = (nid: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/page?nid=${nid}`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    public getOfferById = (offer_id: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/exclusive-offer/offer?nid=${offer_id}`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get popular cities destinations
    public getPopularCities = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/popular-cities`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get travel news data
    public getTravelNews = () => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/travel-news?page=1`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get travel news data
    public getTravelNewsById = (new_id: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/travel-news?nid=${new_id}`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get travel news data
    public getLandingPageInfoById = (page_id: any) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/landing-page?nid=${page_id}`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // gegt static text data
    public getStaticPageText = (page_id: string, lang: string) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/page?nid=${page_id}&lang=${lang}`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get city bundles
    public getCityBundlesById = (bundle_id: string, currency: string) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/city-bundle?nid=${bundle_id}&currency=${currency}`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // get search support helps
    public getSearchHelps = (search: string) => {
        return new Promise<any>((resolve, reject) => {
            return get({
                url: `rest/search-support?search=${search}`
            }, 'drupal').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // send feedback to support
    public sendFeedback = (feedback: any) => {
        return new Promise<any>((resolve, reject) => {
            return post({
                url: `rest/feedback`,
                body: feedback
            }, 'customapi').then(resolve).catch(this.handleError.bind(null, reject));
        });
    };

    // handle error
    private handleError = (reject: any, response: HTTPResponse): Promise<HTTPResponse> => {
        if (response.message === "Failed to fetch") {
            return reject({ message: "errors.server_is_down" });
        }

        const entity = response.entity;
        if (response.status && response.status === 401) {

            // TODO: update location state
            const state = {
                message: entity.message,
                redirect: history.location.pathname,
            };
            history.push({ pathname: "/" });
            return Promise.resolve(response);
        };

        if (entity?.message) Logger.error(entity.message);
        return reject({ message: entity });
    }

};

export default new Services();
