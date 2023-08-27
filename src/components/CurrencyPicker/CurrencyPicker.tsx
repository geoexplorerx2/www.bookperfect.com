import { Popover, Transition } from '@headlessui/react';
import React, { FC, Fragment, ReactNode, useEffect, useRef, useState } from 'react';
// import { Currencies } from '../../constants/currencies';
import ButtonPrimary from '../../lib/Button/ButtonPrimary';
import ButtonSecondary from '../../lib/Button/ButtonSecondary';
import ButtonWithIcon from '../../lib/Button/ButtonWithIcon';
import {useDispatch} from 'react-redux';
import {currency, CURRENCY, tripIdeasData} from '../../store/actions'
import { useSelector } from 'react-redux';


interface CurrencyPickerProps {
  openDropdownMenu: any,
  setOpenDropdownMenu: any,
  icon: ReactNode;
  // handleButtonClick: any;
  modeLight: any;
  buttonClassNames?: string,
  poppoverClassNames?: string,
  hasDropDown?: boolean,
  
};

// export const Currency = [
//     {
//         name: 'USD',
//         icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M8 1.5V14.5" stroke="#666666" stroke-linecap="round" stroke-linejoin="round"/>
//                 <path d="M11.5 5.5C11.5 5.1717 11.4353 4.84661 11.3097 4.54329C11.1841 4.23998 10.9999 3.96438 10.7678 3.73223C10.5356 3.50009 10.26 3.31594 9.95671 3.1903C9.65339 3.06466 9.3283 3 9 3H6.75C6.08696 3 5.45107 3.26339 4.98223 3.73223C4.51339 4.20107 4.25 4.83696 4.25 5.5C4.25 6.16304 4.51339 6.79893 4.98223 7.26777C5.45107 7.73661 6.08696 8 6.75 8H9.5C10.163 8 10.7989 8.26339 11.2678 8.73223C11.7366 9.20107 12 9.83696 12 10.5C12 11.163 11.7366 11.7989 11.2678 12.2678C10.7989 12.7366 10.163 13 9.5 13H6.5C5.83696 13 5.20107 12.7366 4.73223 12.2678C4.26339 11.7989 4 11.163 4 10.5" stroke="#666666" stroke-linecap="round" stroke-linejoin="round"/>
//               </svg>        
//     }
// ];

const CurrencyPicker: FC<CurrencyPickerProps> = ({ openDropdownMenu, setOpenDropdownMenu, icon, modeLight, buttonClassNames = 'hidden xl:inline-flex', poppoverClassNames, hasDropDown = true }) => {

  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);
  const activeCurrency: any = useSelector((state: { CurrencyReducer: any; }) => state.CurrencyReducer.currency);
  const lightmode: any = useSelector((state:any)=>state.LightMode);

  // console.log(lightmode.mode);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [currencyBackgroundStatus, setCurrencyBackgroundStatus] = useState<any>({ name: 'EUR' });
  
  const currencies = [
    {
      name: 'EUR',
      icon: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_951_7407)">
          <path d="M13.1414 13.7037C12.4334 14.4114 11.5315 14.8933 10.5497 15.0885C9.56788 15.2837 8.55024 15.1834 7.62539 14.8004C6.70054 14.4174 5.91 13.7688 5.35371 12.9365C4.79741 12.1043 4.50032 11.1259 4.5 10.1248V7.87482C4.50032 6.87379 4.79741 5.89533 5.35371 5.06311C5.91 4.23089 6.70054 3.58227 7.62539 3.19923C8.55024 2.8162 9.56788 2.71595 10.5497 2.91115C11.5315 3.10635 12.4334 3.58825 13.1414 4.29592" stroke={activeCurrency=='EUR'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
          <path d="M2.8125 7.875H9.5625" stroke={activeCurrency=='EUR'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
          <path d="M2.8125 10.125H8.4375" stroke={activeCurrency=='EUR'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_951_7407">
            <rect width="18" height="18" fill={activeCurrency=='EUR'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} />
          </clipPath>
        </defs>
      </svg>


    },
    {
      name: 'USD',
      icon: <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_951_7484)">
          <path d="M8 1.5V14.5" stroke={activeCurrency=='USD'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
          <path d="M11.5 5.5C11.5 5.1717 11.4353 4.84661 11.3097 4.54329C11.1841 4.23998 10.9999 3.96438 10.7678 3.73223C10.5356 3.50009 10.26 3.31594 9.95671 3.1903C9.65339 3.06466 9.3283 3 9 3H6.75C6.08696 3 5.45107 3.26339 4.98223 3.73223C4.51339 4.20107 4.25 4.83696 4.25 5.5C4.25 6.16304 4.51339 6.79893 4.98223 7.26777C5.45107 7.73661 6.08696 8 6.75 8H9.5C10.163 8 10.7989 8.26339 11.2678 8.73223C11.7366 9.20107 12 9.83696 12 10.5C12 11.163 11.7366 11.7989 11.2678 12.2678C10.7989 12.7366 10.163 13 9.5 13H6.5C5.83696 13 5.20107 12.7366 4.73223 12.2678C4.26339 11.7989 4 11.163 4 10.5" stroke={activeCurrency=='USD'?'#fff':lightmode.mode=='dark'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_951_7484">
            <rect width="16" height="16" fill={activeCurrency=='USD'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} />
          </clipPath>
        </defs>
      </svg>


    },
    {
      name: 'TRY',
      icon: <svg width="18" height="18" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.1736 6.27841C10.1736 9.34691 7.79288 11.8698 4.78152 12.097V5.83112L9.26534 4.19915L8.9622 3.36623L4.78152 4.88788V3.58623L9.26534 1.95425L8.9622 1.12134L4.78152 2.64299V0H3.89516V2.9656L1.94043 3.67705L2.2436 4.50997L3.89516 3.90886V5.21049L1.94043 5.92194L2.2436 6.75486L3.89516 6.15373V13H4.33834C6.13509 13 7.82343 12.3012 9.09226 11.0324C10.3611 9.7635 11.0599 8.07519 11.0599 6.27841H10.1736V6.27841Z" fill={activeCurrency=='TRY'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} />
      </svg>


    },
    {
      name: 'GBP',
      icon: <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.86526 7.46956H9.36456V6.50405H4.86526V3.66678C4.86526 2.17727 6.07704 0.965517 7.56651 0.965517C9.05599 0.965517 10.2678 2.17731 10.2678 3.66678H11.2333C11.2333 1.64492 9.58837 0 7.56651 0C5.54466 0 3.89974 1.64492 3.89974 3.66678V6.50405H2.7733V7.46956H3.89974V13.0345H2.76709V14H11.2144V13.0345H4.86526V7.46956Z" fill={activeCurrency=='GBP'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} />
      </svg>


    },
    {
      name: 'SAR',
      icon: <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.28285 9.82422H9.28335C9.55894 9.82422 9.83533 9.82305 10.1134 9.82174L10.2247 9.82141C10.5448 9.8201 10.8669 9.81876 11.1923 9.81876C11.2695 9.81876 11.3343 9.75841 11.3397 9.6812C11.4974 7.41003 11.3196 6.45052 10.6352 5.87916C10.6086 5.8574 10.5752 5.84526 10.5408 5.84526L10.5239 5.84626C10.4833 5.85048 10.4462 5.87224 10.422 5.90505C10.037 6.42382 10.0479 6.89301 10.4577 7.42562C10.6067 7.61906 10.6642 7.90076 10.7325 8.23356C10.7536 8.33713 10.7755 8.44366 10.8013 8.5527C10.5633 8.55237 10.3324 8.55072 10.0992 8.54924L10.0382 8.54891C9.79311 8.54759 9.55545 8.54578 9.32261 8.54578C8.90752 8.54578 8.56746 8.55072 8.25262 8.56113L8.20396 8.5621C7.79448 8.5621 7.61521 8.4137 7.58494 8.0502C7.54526 7.56962 7.49984 7.00543 7.45679 6.46657C7.40071 5.76409 7.34786 5.10375 7.31421 4.72767C7.25601 4.076 6.89474 3.01539 6.85317 2.89502C6.83224 2.8359 6.77616 2.79639 6.71349 2.79639C6.65032 2.79639 6.59408 2.83654 6.57404 2.89641C6.54182 2.99142 6.49636 3.09228 6.45225 3.19022C6.34536 3.42802 6.23504 3.67366 6.25923 3.92486C6.31208 4.46506 6.41004 5.00699 6.50652 5.53999L6.50984 5.55804C6.57002 5.89093 6.63247 6.23563 6.68191 6.57435C6.73138 6.91483 6.7684 7.27401 6.80082 7.59105C6.8419 7.99247 6.88428 8.40742 6.95213 8.81969C7.05554 9.44903 7.40829 9.80163 7.94554 9.81251C8.34098 9.82046 8.76601 9.82422 9.28285 9.82422Z" fill={activeCurrency=='SAR'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} />
        <path d="M9.11414 11.0431L9.70027 11.7116C9.72664 11.7422 9.76478 11.7605 9.7946 11.7611L9.81174 11.7626C9.84918 11.7626 9.88498 11.7484 9.91252 11.7227L10.5494 11.128C10.6078 11.0732 10.6124 10.9835 10.56 10.9232L9.93378 10.2031C9.90758 10.1731 9.87111 10.1553 9.82231 10.1526C9.7857 10.1526 9.74924 10.1672 9.7227 10.1917L9.07969 10.7849C9.05823 10.8042 9.04654 10.8295 9.03945 10.8555L8.45746 10.1661C8.4319 10.1353 8.39398 10.1163 8.34499 10.1135C8.30791 10.1135 8.27241 10.1274 8.24541 10.1523L7.6071 10.7329C7.54765 10.7869 7.54204 10.8773 7.59474 10.9387L8.23034 11.6772C8.2564 11.7072 8.29398 11.726 8.33851 11.7283H8.34234C8.37942 11.7283 8.41491 11.7148 8.44161 11.69L9.07327 11.1161C9.09486 11.0953 9.10722 11.0698 9.11414 11.0431Z" fill={activeCurrency=='SAR'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} />
        <path d="M5.80212 3.04564C5.77193 2.81442 5.60182 2.60926 5.28204 2.41895C5.16056 2.34629 5.05001 2.23893 4.93307 2.12539C4.87264 2.06636 4.80981 2.00567 4.74242 1.94621C4.71561 1.92205 4.68065 1.90894 4.64413 1.90894L4.62089 1.91061C4.57677 1.91786 4.53891 1.94426 4.51698 1.98226C4.16065 2.59411 4.29023 3.12803 4.44028 3.74647L4.47491 3.89036C4.75172 5.05443 4.86709 6.28299 4.97881 7.47337L5.02055 7.91527C5.0922 8.65807 5.00283 9.15215 4.73952 9.47014C4.46525 9.8013 3.98468 9.98205 3.18112 10.0563C3.0425 10.0691 2.90489 10.0709 2.78935 10.0709L2.50124 10.0694C1.76626 10.0678 1.23229 9.86888 0.956704 9.49371C0.823112 9.31163 0.772638 9.15446 0.787984 8.96861C0.805897 8.7524 1.02531 8.05051 1.36339 7.53662C1.41303 7.46143 1.43027 7.3712 1.41206 7.28289C1.39392 7.19458 1.3423 7.1183 1.26711 7.06916C1.1163 6.96947 0.897441 7.01624 0.800874 7.16316C0.327136 7.83115 0.0994884 8.77514 0.0583338 8.95988C-0.0715194 9.50016 0.0170955 10.0276 0.307438 10.4455C0.604309 10.8723 1.08257 11.1454 1.65418 11.2146C1.94369 11.2499 2.24664 11.2669 2.58004 11.2669C2.85777 11.2669 3.155 11.255 3.48923 11.2302C4.29056 11.1708 4.8941 10.9069 5.28354 10.4456C5.70204 9.95004 5.86975 9.232 5.78225 8.31108C5.70812 7.52806 5.61602 6.74322 5.52687 5.98391L5.52168 5.93896C5.45695 5.38559 5.39007 4.81462 5.33112 4.25193C5.31513 4.09856 5.34688 3.92769 5.40154 3.87163C5.70795 3.55713 5.83527 3.29508 5.80212 3.04564Z" fill={activeCurrency=='SAR'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} />
        <path d="M14.5007 7.90246L14.4134 7.79806C14.2439 7.57973 13.807 7.02254 13.4114 6.57098C13.2194 6.35229 12.8562 6.32796 12.6367 6.51978C12.4092 6.71908 12.3864 7.06665 12.5856 7.29432C12.8757 7.6254 13.1999 8.02978 13.4249 8.31543C13.466 8.36077 13.4973 8.40248 13.5281 8.44403C13.556 8.48147 13.5835 8.51825 13.6163 8.5565C13.9035 8.88981 14.3111 9.55905 13.8184 10.2997C12.9113 11.6629 11.8628 12.3543 10.7021 12.3543C10.7019 12.3543 10.7019 12.3543 10.7017 12.3543C10.6105 12.3543 10.5172 12.35 10.424 12.3414C10.1941 12.321 9.95947 12.2692 9.73218 12.2194C9.68453 12.2088 9.63258 12.1982 9.5821 12.188C9.51846 12.1752 9.4566 12.1626 9.4068 12.1511C9.28939 12.1237 9.20741 12.2105 9.18085 12.2784C9.16503 12.3539 9.21087 12.4296 9.28557 12.4508C9.53478 12.5207 9.79797 12.6165 10.0302 12.701C10.5573 12.8927 11.1022 13.0906 11.6415 13.091C11.6842 13.091 11.7267 13.0893 11.7698 13.0872C12.8993 13.0192 13.6818 12.2145 14.5015 11.0368C14.5213 11.016 14.9844 10.5166 14.9997 9.51341C15.0152 8.50951 14.5208 7.92571 14.5007 7.90246Z" fill={activeCurrency=='SAR'?'#fff':lightmode.mode=='dark'?'#fff':'#3944B3'} />
      </svg>


    }
  ];
  const handleCurrency = (data: any) => {
    // set active currency
    dispatch(
      currency(data)
    );
    // setCurrencyBackgroundStatus({ name: data });
  };

  useEffect(() => {
    // request packages
    let req = {
      lang: activeLang.toUpperCase(),
      currency: activeCurrency,
      countryCode: 'TR'
    };
    
    dispatch(
      tripIdeasData(req)
    );

  }, [activeCurrency]);
  
  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;

    // click inside
    if (!openDropdownMenu.show || containerRef.current.contains(event.target as Node)) {
      return;
    }

    // click outside
    setOpenDropdownMenu({
      show: false,
      type: ''
    });
  };

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    openDropdownMenu.show && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [openDropdownMenu]);

  return (

    <Popover
      as="div"
      className={`menu-item menu-dropdown relative ${poppoverClassNames}`}
      ref={containerRef}
    >
      {({ open, close }) => (
        <>
          <Popover.Button
            as={'div'}
            className="focus-visible focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          //   ref={popoverButtonRef}
          >
            <ButtonWithIcon
              className={buttonClassNames} // inline-block
              icon={icon}
              hasDropdown={hasDropDown}
              buttonType='currency'
              handleClick={(opened: boolean) => setOpenDropdownMenu({ show: opened, type: 'currency' })}
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            show={openDropdownMenu.type === 'currency' && openDropdownMenu.show}
            appear
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="sub-menu will-change-transform absolute transform z-60 w-[138px] pt-3 right-0"
            >
              <div className="border-2 border-[rgba(218, 219, 232, 1)] rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-2 grid grid-cols-1 gap-2.5">
                {
                  currencies?.map((currency: any) => (
                    <div className="flex justify-arround mx-auto">
                      <ButtonSecondary rounded="" className={`rounded-[8px] ${activeCurrency == currency.name ? '!bg-[#3944B3]' : lightmode.mode == 'dark' ? '#fff ':'#3944B3'} border-2 border-[rgba(57, 68, 179, 20%)] hover:border-[#3944B3] flex justify-arround  text-[0.5vw] dark:text-white w-[106px] h-[45px]`} onClick={() => handleCurrency(currency.name)}>
                        <div className='flex justify-between items-center'>
                          <div>{currency.icon}</div>
                          <div className={`flex items-center px-2 mt-[0.2vh] text-[12px] ${activeCurrency == currency.name ? 'text-[#FFFFFF]' : lightmode.mode=='dark'?'#fff':'#3944B3'}`}>{currency.name}</div>
                        </div>
                        {/* { currency.name }  */}
                      </ButtonSecondary>
                    </div>
                  ))
                }
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
};

export default CurrencyPicker;