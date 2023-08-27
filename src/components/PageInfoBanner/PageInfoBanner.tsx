import { NONAME } from 'dns';
import React, { FC } from 'react'
import { BASE_URL } from '../../api/env';
import { stripHtml } from '../../common/stripHtml';
interface PageInfoBannerProps {
 data?:any;
}
const PageInfoBanner: FC<PageInfoBannerProps> = ({data}) => {
  return (
    <div className='w-full h-[500px] md:h-[402px] lg:h-[600px] xl:h-[402px] flex flex-col items-center xl:flex-row px-5 md:px-[10.1vw] xl:pr-[10.1vw] xl:pl-0'>
      <div className='w-full xl:w-[65%] xl&2xl:w-[56%] h-full rounded-bl-[30px] rounded-tl-[30px] xl:rounded-bl-none xl:rounded-tl-none  rounded-tr-[30px] rounded-br-[30px]' 
           style={{backgroundImage: `url(${BASE_URL + data.field_image.url})`,backgroundRepeat:'no-repeat',WebkitBackgroundSize:'Cover'}}>
        
      </div>
      <div className=' w-full xl:w-[35%]  xl&2xl:w-[44%]  h-full'>
        <div className='w-[100%] xl:pl-14 mt-7 text-center xl:text-left'>
          <h2 className='w-full xl:max-w-[515px] text-[#3944B3] text-base md:text-xl lg:text-[28px] font-light dark:text-white'>
            {/* Aliquam sed laoreet
            <span className='font-medium dark:text-white'> purus rutrum ex Donec eu</span>
            iaculis lacus.. */}
            {/* {data && stripHtml(data.field_landing_page_title)} */}
            {data && <div dangerouslySetInnerHTML={{ __html: data.field_landing_page_title }} />}
          </h2>
        </div>
        <div className='w-[100%]'>
          <div className='w-[99%] xl:pl-14  font-light text-sm md:text-[15px] mt-[16px] text-center xl:text-left dark:text-white'>
            <span className='w-full text-justify'>
              {/* {data && stripHtml(data.body)} */}
              {data && <div dangerouslySetInnerHTML={{ __html: data.body }} />}
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nulla metus, euismod eget lacus
              a, fringilla elementum est. Duis varius ipsum mauris, vitae porttitor lectus sagittis et. Ut tristique
              ultricies arcu. Vestibulum varius sem id sapien efficitur dignissim quis id dolor. */}
            </span>
          </div>
          <div className='w-[99%] xl:pl-14 font-light text-sm md:text-[15px] mt-[21px] text-center xl:text-left dark:text-white'>
            {/* Ut ac dolor posuere ex porta lobortis. Duis ac ligula in justo feugiat lacinia. In pulvinar mauris ut
            turpis euismod fermentum. Morbi vel consequat neque. Sed ornare facilisis vulputate. Nullam pulvinar */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageInfoBanner
