import React, { FC, useState } from 'react';
import { useNotification } from '../../hooks';
import file from '../../images/file.svg';
import { useHistory } from 'react-router-dom'
interface PromoCodeProps{
  promocode?: any;
  wrapperClassNames?: string;
  checkMarkClassnames?: string;
  handleOffer?: () => void
};

const PromoCode: FC<PromoCodeProps> = (props) => {
  const { promocode,
          wrapperClassNames ='bg-[#FFF9F9] h-[116px] border border-1 rounded-[16px] dark:bg-[transparent] px-4 bigMd:px-10',
          checkMarkClassnames,
          handleOffer
        } = props
  const renderNotification = useNotification()
  const [clicked, setClicked] = useState(false)
  const history = useHistory()
  const handleClipboard = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    navigator.clipboard.writeText(promocode).then(
      () => {
        /* clipboard successfully set */
        e.stopPropagation()
        setClicked(true)
        setTimeout(() => {
          setClicked(false)
          handleOffer && handleOffer()
        }  , 1000)
        
        // renderNotification('The Promo Code Copied')
        
      },
      () => {
        /* clipboard write failed */
      }
    );
  };

  return (
    <div className={`${wrapperClassNames}`}>
      
        <div className='font-normal text-[16px] text-[#0E123D] mt-5 dark:text-white leading-[24px]'>Promo Code</div>
        <div className='flex justify-start mt-2 flex-col' onClick={(e) => {e.stopPropagation()}}>
          <div className='flex'>

            <div className={`w-[70%] border border-r-[transparent] border-dashed bg-[#FFFFFF] dark:bg-[transparent] pl-3 pr-8 py-1 border-[#F75847] ${ clicked ? "copied-border" : "" }`} >
                <span className='text-[14px] text-[#F75847] dark:text-[#fff] font-medium'> { promocode ?? 'PROMOCODE' } </span>
            </div>
            <div className={`w-[50px] h-9 relative rounded-lg flex justify-center items-center bg-[#F75847] cursor-pointer flex-grow-0 flex-shrink-0 ${clicked ? "copied-bg" : ""}`} onClick={(e) => { handleClipboard(e) }}>
              {
                clicked
                 ? 
                  <div className={`check ${checkMarkClassnames}`}></div>
                 : 
                 <img className='w-5' src={ file }  />
              } 

            </div>
          </div>
        </div>
     
    </div>
  )
}

export default PromoCode