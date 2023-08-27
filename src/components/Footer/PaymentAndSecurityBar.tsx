import React, { FC } from 'react';
import redsys from '../../images/icons/redsys.png'

const PaymentAndSecurityBar: FC = () => {
  return (
        <div className=' py-6 px-5 bg-[#F4F8FF] mx-5 rounded-[4px] md:rounded-none md:mx-0 md:px-[10vw] overflow-hidden'>
            <div className='flex items-center mb-[14px]'>
                <span className='text-[#0E123D] font-medium whitespace-nowrap mr-[10px]'>Payment & Security</span>
                <span className='w-full h-[1px] bg-[#B4C7E2]'></span>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-5 justify-between flex-wrap'>
                {
                    data.map((item, index) => {
                        const {src, className} = item
                        const isLastItem = index === data.length - 1
                        const isFirstItem = index === 0
                        return (
                            <div className={`flex items-center h-full border-[#B4C7E2] 
                                ${isFirstItem ? 'justify-start' : 'justify-center'}
                                ${isLastItem ? '' : 'border-r'}
                                `}>
                                <img src={src} className={`${isFirstItem && 'w-3/4'} ${className}`}  alt='' /> 
                            </div>
                        )
                    })
                }
            </div>
        </div>
  )
}

const data = [
    {
        label: 'Redsys',
        src: redsys,
        id: 'redsys',
        className: 'w-[95px]'
    },
    {
        label: 'American Express',
        src: 'https://bookperfect.imgix.net/brands/footerBrand3.svg',
        id: 'americanExpress',
        className: 'w-[75.41px]'
    },
    {
        label: 'Master Card',
        src: 'https://bookperfect.imgix.net/brands/footerBrand4.svg',
        id: 'masterCard',
        className: '!w-[51.65px]'
    },
    {
        label: 'Visa',
        src: 'https://bookperfect.imgix.net/brands/footerBrand5.svg',
        id: 'visa',
        className: '!w-[51.65px]'
    },
    // {
    //     label: 'Discover',
    //     src: 'https://bookperfect.imgix.net/brands/footerBrand6.svg',
    //     id: 'discover',
    //     className: '!w-[61.98px]'
    // },
    // {
    //     label: 'JCB',
    //     src: 'https://bookperfect.imgix.net/brands/footerBrand8.svg',
    //     id: 'JCB',
    //     className: '!w-[43.39px]'
    // },
    // {
    //     label: 'Union Pay',
    //     src: 'https://bookperfect.imgix.net/brands/footerBrand9.svg',
    //     id: 'unionPay',
    //     className: '!w-[42.35px]'
    // },
    // {
    //     label: 'Apple Pay',
    //     src: 'https://bookperfect.imgix.net/brands/footerBrand.svg',
    //     id: 'applePay',
    //     className: '!w-[53.72px]'
    // },
    // {
    //     label: 'Google Pay',
    //     src: 'https://bookperfect.imgix.net/brands/footerBrand11.svg',
    //     id: 'googlePay',
    //     className: '!w-[94px]'
    // },
]

export default PaymentAndSecurityBar