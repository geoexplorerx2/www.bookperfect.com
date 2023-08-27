import React from 'react'

const FooterMembership = () => {
  return (
    <div className=' py-6 px-5 bg-[#F4F8FF] mx-5 rounded-[4px] md:rounded-none md:mx-0 md:px-[10vw] overflow-hidden hidden md:inline-block'>
    <div className='flex items-center mb-[14px]'>
        <span className='text-[#0E123D] font-medium whitespace-nowrap mr-[10px]'>Membership</span>
        <span className='w-full h-[1px] bg-[#B4C7E2]'></span>
    </div>
    <div className='grid grid-cols-3 sm:grid-cols-4 justify-between flex-wrap'>
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
</div>  )
}


const data = [
    
    {
        label: 'ABTTA',
        src: 'https://bookperfect.imgix.net/brands/footerBrandABTTA.png',
        id: 'americanExpress',
        className: 'w-[75.41px]'
    },
    {
        label: 'TURSAB',
        src: 'https://bookperfect.imgix.net/brands/footerBrand13.svg',
        id: 'masterCard',
        className: '!w-[51.65px]'
    }
]



export default FooterMembership