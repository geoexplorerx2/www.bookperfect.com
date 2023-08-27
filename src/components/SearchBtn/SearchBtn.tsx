import React, { FC, ReactNode } from 'react'
import MagnifyingGlass from '../../images/icons/magnifyingGlass'
import { useDispatch } from 'react-redux';
import { SearchBtnStatus } from '../../store/actions/SearchBtnStatus';
const Arrow = () => {
    return (
        <>
            <svg width="20" height="20" viewBox="0 0 20 20" stroke='currentColor' fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.9">
                    <path d="M3.125 10H16.875" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.25 4.375L16.875 10L11.25 15.625" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>

        </>
    )
}

interface SearchBtnType {
    children?: ReactNode,
    isOpen?: boolean,
}

const SearchBtn: FC<SearchBtnType> = (props) => {
    const { children, isOpen } = props
    const dispatch = useDispatch();
    return (
        <div className='w-full cursor-pointer'>
            <div className={`w-full rounded-[20px] h-[53px] flex ${isOpen ? '' : 'bg-[#F4F8FF] dark:bg-transparent dark:border-[#F4F8FF] dark:border'}`}>
                <div className='min-w-[52px]  border border-[#3944B3] dark:border-white rounded-[20px] flex justify-center items-center mr-2 dark:-translate-x-[1px]'>
                    <MagnifyingGlass className='text-[#3944B3] dark:text-[#F4F8FF] translate-x-[2px] translate-y-[2px]' size={30} />
                </div>
                <div className='w-full flex items-center relative'>
                    {isOpen && children}
                    {!isOpen && <div className='mx-5 text-[#3944B3] dark:text-[#F4F8FF] text-xs md:text-[14px] font-normal opacity-[.9] typing-effect'>Check out our travel guide</div>}
                    {!isOpen && <span className='absolute top-1/2 right-0 -translate-y-1/2  mx-2 text-[#3944B3] dark:text-[#F4F8FF]'>{Arrow()}</span>}
                </div>
            </div>
        </div>
    )
}

export default SearchBtn
