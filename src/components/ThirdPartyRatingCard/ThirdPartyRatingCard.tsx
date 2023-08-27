import React, { FC } from 'react'
// import BookingdotComLogo from '../../images/Booking.com-Logo.png'
import BookingdotComBrandText from '../../images/icons/Booking.comBrandtext.svg'
import { ReactComponent as Star } from '../../images/icons/Star.svg'
import { ReactComponent as ChatIcon } from '../../images/icons/chat.svg'
import { ReactComponent as TripAdvisorLogo } from '../../images/icons/TripadvisorLogo.svg'
// import expediaLogo from '../../images/expedia-logo.png'
import ExpediaLogo from '../../images/icons/expediaLogo.svg'

import BookingdotComLogo from '../../images/icons/BookingdotComLogo.svg'
import expediaBrandText from '../../images/icons/expediaBrandText.svg'
import TripAdvisorBrandText from '../../images/icons/TripAdvisorBrandText.svg'

interface RatingType {

  source: string,
  numReviews: number,
  score: string,

}


interface ThirdPartyRatingCard {
  ratings: RatingType[]
}



const TripAdvisorCard: FC<RatingType> = (props) => {
  const { numReviews, score , source } = props
  
  return (
    <>
      {
         Number(score)  > 0 &&
        <div>
          <div className='bg-[#D8FFF2] flex flex-col items-center rounded-[10px] px-2 h-[92px]'>
            <div className='bg-white p-2 rounded-full -translate-y-1/2'>

              {/* <img src={TripAdvisorLogo} className="w-8 h-8" /> */}
              <TripAdvisorLogo className="w-8 h-8" />
            </div>
            <div className='flex flex-col items-center -translate-y-[18px]'>
              <img src={TripAdvisorBrandText} className="mb-2" />
              <div className='rating flex w-full pl-[6px]'>
                <Star className='text-[#014880] mr-2 mb-2' />
                <span className='score text-xs font-medium text-[#014880] '> {score} </span>
              </div>
              <div className='rating flex w-full pl-[6px]'>
                <ChatIcon className='text-[#014880] mr-2 mb-2' />
                <span className='score text-xs font-medium text-[#014880] '> {numReviews} </span>
              </div>
            </div>

          </div>
        </div>
      }
    </>
  )
}




const BookingDotComCard: FC<RatingType> = (props) => {
  const { numReviews, score, source } = props
  return (
    <>
      {
        Number(score)  > 0 &&
        <div>
          <div className='bg-[#EBF6FF] flex flex-col items-center rounded-[10px] px-2 h-[92px]'>
            <div className='bg-white p-2 rounded-full -translate-y-1/2'>

              <img src={BookingdotComLogo} className="w-[27px] h-[27px]" />
            </div>
            <div className='flex flex-col items-center -translate-y-[18px]'>
              <img src={BookingdotComBrandText} className="mb-2" />
              <div className='rating flex w-full pl-[6px]'>
                <Star className='text-[#014880] mr-2 mb-2' />
                <span className='score text-xs font-medium text-[#014880] '> {score} </span>
              </div>
              <div className='rating flex w-full pl-[6px]'>
                <ChatIcon className='text-[#014880] mr-2 mb-2' />
                <span className='score text-xs font-medium text-[#014880] '> {numReviews} </span>
              </div>
            </div>

          </div>
        </div>

      }
    </>
  )
}




const ExpediaCard: FC<RatingType> = (props) => {
  const { numReviews, score, source } = props
  return (
    <>
      {
        Number(score)  > 0 &&
        <div>
          <div className='bg-[#E6EAFA] flex flex-col items-center rounded-[10px] px-2 h-[92px]'>
            <div className='bg-white p-2 rounded-full -translate-y-1/2'>

              <img src={ExpediaLogo} className="w-8 h-8" />
            </div>
            <div className='flex flex-col items-center -translate-y-[18px]'>
              <img src={expediaBrandText} className="mb-2" />
              <div className='rating flex w-full pl-[6px]'>
                <Star className='text-[#014880] mr-2 mb-2' />
                <span className='score text-xs font-medium text-[#014880] '> {score} </span>
              </div>
              <div className='rating flex w-full pl-[6px]'>
                <ChatIcon className='text-[#014880] mr-2 mb-2' />
                <span className='score text-xs font-medium text-[#014880] '> {numReviews} </span>
              </div>
            </div>

          </div>
        </div>

      }
    </>
  )
}









const ThirdPartyRatingCard: FC<ThirdPartyRatingCard> = (props) => {
  const { ratings } = props



  return (
    <div className='w-full flex justify-center'>
      {ratings.map(rating => {
        // if (rating.source === 'Booking.com') return <BookingDotComCard {...rating} />
        if (rating.source === 'Tripadvisor') return <TripAdvisorCard {...rating} />
        // if (rating.source === 'Expedia') return <ExpediaCard {...rating} />
      })}
    </div>
  )
}




export default ThirdPartyRatingCard