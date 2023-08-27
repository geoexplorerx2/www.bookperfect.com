import React, { FC } from 'react';
import { BASE_URL } from '../../api/env';
import { stripHtml } from '../../common/stripHtml';
import CarImage from '../../images/CarImage.svg';

interface TravelNewsDetailProps {
   data?: any;
};

const TravelNewsDetail: FC<TravelNewsDetailProps> = ({data}) => {
    const {
      created,
      title,
      body,
      field_image
    } = data;

    return (
        <div className='w-[100%] flex justify-center px-5 md:px-[10.1vw]'>
            <div className='w-full flex flex-col lg:flex-row justify-between'>
                <div className='relative'>
                    <img className='w-full top-0 right-0 z-0 max-w-[539px]' src={ field_image && field_image.width > 300 ? (BASE_URL + field_image.url) : CarImage} />
                    <div className='absolute top-0 z-1 '>
                        <div className='w-full flex justify-end'>
                            <div className='h-[61px] w-[42px] bg-[#FFE5E2] rounded-[4px]'>
                                <div className='w-full h-[50%] bg-[#F75847] rounded-[4px] flex justify-center items-center'>
                                    <span className='text-[12px] font-medium text-[#fff]'>{ new Date(created * 1000).toLocaleString('en-US', { month: 'short' }) }</span>
                                </div>
                                <div className='w-full h-[50%] bg-[transparent] rounded-[4px] flex justify-center items-center'>
                                    <span className='text-[12px] font-medium text-[#000]'>{new Date(created * 1000).getDate()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-[60%] mt-8 lg:mt-0 '>
                    <div className='text-[20px] font-normal text-[#0E123D] dark:text-[#fff]'>{ title }</div>
                    <div className='w-full text-[14px] font-light text-[#3F4249] leading-[30px] py-5 text-justify overflow-hidden dark:text-[#fff]'>
                        <div className='my-4'>
                            { body && stripHtml(body) }
                        </div>

                        <div className='my-8'>
                            {/* Aenean rhoncus turpis fringilla massa accumsan facilisis. Vivamus malesuada facilisis ligula, vitae
                            fringilla justo. Phasellus vitae leo ante. Ut non orci mi. Pellentesque varius turpis sapien, vitae
                            viverra diam laoreet eget. Nullam aliquet aliquet ligula eget tincidunt. Donec mattis et dolor nec
                            lacinia. In sed ornare dolor. Vestibulum eros nunc, volutpat nec venenatis a, vehicula ac massa. */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelNewsDetail;
