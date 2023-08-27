import React, { FC, ReactNode } from "react";
import Copyright from "../Copyright/Copyright";
import {ReactComponent as Instagram} from '../../images/Component1.svg';
import {ReactComponent as Facebook} from '../../images/Component2.svg';
import twitter from '../../images/Component3.svg';
import { ReactComponent as Youtube} from '../../images/Component4.svg';
import whatsapp from '../../images/Component5.svg';
import { goToPage } from "../../common/goToPage";
import { ReactComponent as LinkedInIcon } from '../../images/icons/linkedInIcon.svg'

// social type
interface SocialType {
  name: string;
  Icon: any;
  href: string;
  id: string
};

interface SocialMediaProps {
  className?: string;
  itemContainerClassNames?: string;
  labelClassNames?: string;
  iconClassNames?: string;
};

// const socials: SocialType[] = [
//   { 
//     name: "Instagram", 
//     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" stroke="white" stroke-miterlimit="10"/>
//             <path d="M16.125 3.375H7.875C5.38972 3.375 3.375 5.38972 3.375 7.875V16.125C3.375 18.6103 5.38972 20.625 7.875 20.625H16.125C18.6103 20.625 20.625 18.6103 20.625 16.125V7.875C20.625 5.38972 18.6103 3.375 16.125 3.375Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M16.875 8.25C17.4963 8.25 18 7.74632 18 7.125C18 6.50368 17.4963 6 16.875 6C16.2537 6 15.75 6.50368 15.75 7.125C15.75 7.74632 16.2537 8.25 16.875 8.25Z" fill="white"/>
//           </svg>,
//     href: "#" 
//   },
//   { 
//     name: "Facebook", 
//     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M15.75 8.25002H14.25C13.9542 8.24878 13.6611 8.30613 13.3875 8.41876C13.114 8.5314 12.8654 8.69708 12.6563 8.90626C12.4471 9.11544 12.2814 9.36397 12.1688 9.63752C12.0561 9.91106 11.9988 10.2042 12 10.5V21" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M9 13.5H15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>, 
//     href: "#" 
//   },
//   { 
//     name: "Twitter", 
//     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M11.9986 8.25034C11.9986 6.18784 13.7329 4.47222 15.7954 4.50034C16.5177 4.50868 17.2222 4.72545 17.8243 5.1246C18.4263 5.52375 18.9003 6.08828 19.1892 6.75034H22.4986L19.4704 9.77847C19.275 12.8203 17.9285 15.6734 15.7047 17.758C13.4808 19.8425 10.5466 21.0018 7.49855 21.0003C4.49855 21.0003 3.74855 19.8753 3.74855 19.8753C3.74855 19.8753 6.74855 18.7503 8.24855 16.5003C8.24855 16.5003 2.24855 13.5003 3.74855 5.25034C3.74855 5.25034 7.49855 9.00034 11.9986 9.75034V8.25034Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>,     
//     href: "#" 
//   },
//   { 
//     name: "Youtube", 
//     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M15 12L10.5 9V15L15 12Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M2.25 11.9997C2.25 14.7934 2.54062 16.4247 2.75625 17.2684C2.81571 17.4974 2.92813 17.7091 3.08447 17.8866C3.2408 18.0641 3.43666 18.2024 3.65625 18.2903C6.79688 19.4903 12 19.4622 12 19.4622C12 19.4622 17.2031 19.4903 20.3438 18.2903C20.5633 18.2024 20.7592 18.0641 20.9155 17.8866C21.0719 17.7091 21.1843 17.4974 21.2438 17.2684C21.4594 16.4247 21.75 14.7934 21.75 11.9997C21.75 9.20592 21.4594 7.57467 21.2438 6.73092C21.1843 6.50198 21.0719 6.29022 20.9155 6.11272C20.7592 5.93522 20.5633 5.79694 20.3438 5.70904C17.2031 4.50904 12 4.53717 12 4.53717C12 4.53717 6.79688 4.50904 3.65625 5.70904C3.43666 5.79694 3.2408 5.93522 3.08447 6.11272C2.92813 6.29022 2.81571 6.50198 2.75625 6.73092C2.54062 7.57467 2.25 9.20592 2.25 11.9997Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>, 
//     href: "#" 
//   },
//   { 
//     name: "+90 212 344 XX", 
//     icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M14.9453 3.75C16.2174 4.09141 17.3774 4.76142 18.3088 5.69279C19.2401 6.62416 19.9102 7.78412 20.2516 9.05625" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M14.1641 6.64648C14.9292 6.84968 15.627 7.25153 16.1867 7.8113C16.7465 8.37107 17.1484 9.06887 17.3516 9.83398" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M8.67188 11.6998C9.44364 13.2935 10.7324 14.579 12.3281 15.3467C12.4458 15.4024 12.576 15.4265 12.7059 15.4167C12.8358 15.4068 12.9608 15.3633 13.0688 15.2904L15.4125 13.7248C15.5161 13.6546 15.6357 13.6117 15.7603 13.6002C15.8849 13.5887 16.0104 13.609 16.125 13.6592L20.5125 15.5435C20.6625 15.6059 20.7877 15.7159 20.869 15.8565C20.9504 15.9971 20.9832 16.1606 20.9625 16.3217C20.8234 17.407 20.2937 18.4046 19.4723 19.1276C18.6509 19.8506 17.5943 20.2495 16.5 20.2498C13.1185 20.2498 9.87548 18.9065 7.48439 16.5154C5.0933 14.1243 3.75 10.8813 3.75 7.49979C3.75025 6.40553 4.1492 5.34886 4.87221 4.5275C5.59522 3.70613 6.59274 3.17635 7.67813 3.03729C7.83922 3.01659 8.00266 3.04943 8.14326 3.13074C8.28386 3.21206 8.39384 3.33733 8.45625 3.48729L10.3406 7.88416C10.3896 7.99699 10.4101 8.12013 10.4003 8.24275C10.3905 8.36537 10.3507 8.48369 10.2844 8.58729L8.71875 10.9685C8.64905 11.0762 8.60814 11.2 8.59993 11.328C8.59172 11.4561 8.6165 11.5841 8.67188 11.6998V11.6998Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>, 
//     href: "#" 
//   },
// ];


const socials: SocialType[] = [
  {
    name: "Instagram",
    Icon: Instagram,
    href: "https://www.instagram.com/bookperfectcom/",
    id: 'instagram'
  },
  {
    name: "Facebook",
    Icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=100090297888105",
    id: 'facebook'
  },
  // { 
  //   name: "Twitter", 
  //   icon: twitter,     
  //   href: "#" 
  // },
  {
    name: "Youtube",
    Icon: Youtube,
    href: "https://www.youtube.com/channel/UClm4KVQaF8lSacMpatcn9fQ",
    id: 'youtube'
  },
  {
    name: "LinkedIn",
    Icon: LinkedInIcon,
    href: "https://www.linkedin.com/company/hotelistan-gts/mycompany/",
    id: 'linkedin'
  },
];


const SocialMedia: FC<SocialMediaProps> = (props) => {
  const { 
    className, 
    labelClassNames, 
    iconClassNames, 
    itemContainerClassNames } = props;

  const renderItem = (item: SocialType, index: number) => {
    const {Icon} = item
    const handleSocialClick = (socialUrl: string) => {
      socialUrl !== '#' && goToPage(socialUrl, 'redirect');
    };

    return (
      <a
        // href = { item.href }
        className={`${itemContainerClassNames} h-11 w-36 !my-0 rounded-2xl pr-4 py-[15px] flex items-center text-2xl hover:bg-[#171C55] text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-300 leading-none space-x-4 group cursor-pointer`}
        key={index}
        onClick={() => handleSocialClick(item.href)}
      >
        <span className={`${labelClassNames} min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] bg-[#fff] flex justify-center items-center rounded-lg`}>
          {/* <img src={item.icon as string} className='w-5 h-5 ' /> */}
          <Icon clasName={`w-5 h-5 ${item.id === 'linkedin ' ? 'h-[40px]' : ''}`} />
        </span>
        <span className={`${iconClassNames} block text-[12px] text-[#FFFFFF] leading-[18px] whitespace-nowrap`}>{item.name}</span>
      </a>
    );

  };

  return (
    <div className={`${className} grid`}>
      <span className="text-white font-medium mb-4">Social Media</span>
      {socials.map(renderItem)}

      {/* Copyright */}
      {/* <Copyright /> */}
    </div>
  );
};

export default SocialMedia;
