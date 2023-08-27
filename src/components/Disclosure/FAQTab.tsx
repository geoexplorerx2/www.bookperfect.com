import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { faqs } from '../../store/actions';
import { useSelector } from 'react-redux';
interface FAQTabProps {
    data?: string;
};

export const DEFAULT_FAQ_ID: any = '160566';

const FAQTab: FC<FAQTabProps> = (data) => {
    const [active, setActive] = useState<any>('General');
    const dispatch = useDispatch();
    const theme = useSelector((state: any) => state.LightMode.mode);
    const activesearchhelp: any = useSelector((state: { SupportReducer: any; }) => state.SupportReducer.activesearchhelp);

    const svg = (color: any) => {
        return (
            <>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_7438_22405" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
                        <rect width="22" height="22" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_7438_22405)">
                        <path d="M11.7261 6.06676L11.7261 6.06681C11.4838 6.25641 11.2871 6.52772 11.1345 6.87779L10.2385 6.50269C10.4203 5.99804 10.7186 5.59733 11.1334 5.29886C11.5596 4.99243 12.0494 4.83893 12.6048 4.83893C13.3278 4.83893 13.9107 5.04946 14.3582 5.46715C14.8061 5.88522 15.0298 6.40659 15.0298 7.03477C15.0298 7.41002 14.9548 7.72976 14.8069 7.9959C14.6579 8.26427 14.3719 8.60386 13.9452 9.01536C13.5935 9.35177 13.3658 9.62468 13.2698 9.83256C13.1777 10.0323 13.1245 10.3297 13.1068 10.7202H12.105C12.1086 10.1521 12.1736 9.74646 12.295 9.4968L12.2951 9.49676C12.42 9.23929 12.6997 8.92028 13.1416 8.5393L13.1416 8.53931L13.1425 8.53851C13.4646 8.24714 13.694 7.99512 13.8278 7.78284L13.8278 7.78281C13.9621 7.5694 14.0298 7.34269 14.0298 7.10352C14.0298 6.70887 13.895 6.38547 13.6239 6.13801L13.6239 6.13796C13.3538 5.89197 13.0127 5.77018 12.6048 5.77018C12.2733 5.77018 11.9797 5.86898 11.7261 6.06676ZM13.1653 13.2557C13.0062 13.4147 12.8202 13.4931 12.6048 13.4931C12.3895 13.4931 12.2034 13.4147 12.0443 13.2557C11.8853 13.0966 11.8069 12.9105 11.8069 12.6952C11.8069 12.4799 11.8852 12.298 12.0435 12.1465C12.2024 11.9952 12.3887 11.9202 12.6048 11.9202C12.821 11.9202 13.0073 11.9952 13.1662 12.1465C13.3245 12.298 13.4027 12.4799 13.4027 12.6952C13.4027 12.9105 13.3244 13.0966 13.1653 13.2557ZM7.37982 15.991C6.93459 15.991 6.55777 15.8358 6.24642 15.5244C5.93507 15.2131 5.77982 14.8362 5.77982 14.391V3.94102C5.77982 3.49579 5.93507 3.11897 6.24642 2.80762C6.55777 2.49627 6.93459 2.34102 7.37982 2.34102H17.8298C18.275 2.34102 18.6519 2.49627 18.9632 2.80762C19.2746 3.11897 19.4298 3.49579 19.4298 3.94102V14.391C19.4298 14.8362 19.2746 15.2131 18.9632 15.5244C18.6519 15.8358 18.275 15.991 17.8298 15.991H7.37982ZM7.37982 14.716H17.8298C17.9089 14.716 17.9819 14.6763 18.0485 14.6097C18.1151 14.5431 18.1548 14.4701 18.1548 14.391V3.94102C18.1548 3.86197 18.1151 3.78889 18.0485 3.72233C17.9819 3.65577 17.9089 3.61602 17.8298 3.61602H7.37982C7.30077 3.61602 7.22769 3.65577 7.16113 3.72233C7.09457 3.78889 7.05482 3.86197 7.05482 3.94102V14.391C7.05482 14.4701 7.09457 14.5431 7.16113 14.6097C7.22769 14.6763 7.30077 14.716 7.37982 14.716ZM4.17148 19.1994C3.72626 19.1994 3.34944 19.0441 3.03809 18.7327C2.72674 18.4214 2.57148 18.0446 2.57148 17.5993V5.82435H3.84648V17.5993C3.84648 17.6784 3.88623 17.7515 3.9528 17.818C4.01936 17.8846 4.09244 17.9243 4.17148 17.9243H15.9465V19.1994H4.17148Z" fill={color} stroke="white" stroke-width="0.1" />
                    </g>
                </svg>

            </>
        )
    };

    const Tabs = [
        {
            name: 'General',
            icon: svg(active == 'General' ? `#fff` : `${theme == 'dark' ? '#fff' : '#3944B3'}`),
            id: '160566'
        },
        {
            name: 'Trip Designer',
            icon: svg(active == 'Trip Designer' ? '#fff' : `${theme == 'dark' ? '#fff' : '#3944B3'}`),
            id: '160588'
        },
        {
            name: 'Flights & More',
            icon: svg(active == 'Flights & More' ? '#fff' : `${theme == 'dark' ? '#fff' : '#3944B3'}`),
            id: '160589'
        },
        {
            name: 'Hotels',
            icon: svg(active == 'Hotels' ? '#fff' : `${theme == 'dark' ? '#fff' : '#3944B3'}`),
            id: '160579'
        },
        {
            name: 'Flights + Hotels',
            icon: svg(active == 'Flights + Hotels' ? '#fff' : `${theme == 'dark' ? '#fff' : '#3944B3'}`),
            id: '160590'
        },
        {
            name: 'Activities',
            icon: svg(active == 'Activities' ? '#fff' : `${theme == 'dark' ? '#fff' : '#3944B3'}`),
            id: '160591'
        },
        {
            name: 'Transfers',
            icon: svg(active == 'Transfers' ? '#fff' : `${theme == 'dark' ? '#fff' : '#3944B3'}`),
            id: '160592'
        },
        {
            name: 'Packages',
            icon: svg(active == 'Packages' ? '#fff' : `${theme == 'dark' ? '#fff' : '#3944B3'}`),
            id: '160593'
        },
        {
            name: 'Rent a Car',
            icon: svg(active == 'Rent a Car' ? '#fff' : `${theme == 'dark' ? '#fff' : '#3944B3'}`),
            id: '160594'
        },
    ];

    const handleTab = (item: any) => {
        dispatch(
          faqs(item.id)
        );

        // active tab
        setActive(item.name);
    };

    useEffect(() => {
       if(activesearchhelp){
        let activeTab = Tabs.find((tab: any) => tab.id == activesearchhelp.nid);

        if(activeTab) setActive(activeTab.name);
       }
    }, [activesearchhelp]);
    
    return (
        <div className='w-full py-1 border-b-2 border-b-[#3944B3] dark:border-b-[#fff]'>
            <div className='w-full flex justify-between overflow-scroll 2xl:overflow-hidden'>
                {Tabs.map((item: any, index: any) => (
                    <div key={index} onClick={() => handleTab(item)} className={`flex cursor-pointer whitespace-nowrap ${active == item.name ? 'text-[#fff] bg-[#3944B3] dark:bg-[#171925] rounded-t-[10px] px-3 py-3' : 'text-[#3944B3] dark:text-[#fff]  px-3 py-3'}`}>
                        <span className='mx-2'>{item.name}</span>
                        <span>{item.icon}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQTab
