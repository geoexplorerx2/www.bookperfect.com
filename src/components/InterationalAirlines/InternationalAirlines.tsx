import React from 'react'

import emiratesLogo from '../../images/airlines/emirates-logo.png'
import omanairLogo from '../../images/airlines/omanair-logo.png'
import kuwaitAirwaysLogo from '../../images/airlines/kuwait-airways-logo.png'
import nepalAirlinesLogo from '../../images/airlines/nepal-airlines-logo.png'
import etihadAirwaysLogo from '../../images/airlines/etihad-airways-logo.png'
import scootLogo from '../../images/airlines/scoot-logo.png'
import singaporeAirlinesLogo from '../../images/airlines/singapore-airlines-logo.png'
import tigerairLogo from '../../images/airlines/tigerair-logo.png'
import turkishAirlinesLogo from '../../images/airlines/turkish-airlines-logo.png'

const InternationalAirlines = () => {
  return (
    <div className='internatinal-airelines min-w-[335px] lg:min-w-[450px]  grid grid-cols-[repeat(auto-fit,minmax(110px,_110px))] justify-center' >
        {
            sampleData.map(airlineBrand => {
                return (
                    <div 
                    key={airlineBrand.id}
                    className={`rounded-2xl bg-white
                                ${airlineBrand.isinvisible ? 'invisible' : 'border border-[#3842B21A]' }
                                ${airlineBrand.name == 'TigerAir' ? "shadow-[0px_0px_14px_1px_rgba(122,_133,_255,_0.56)]" : ""}
                                `}>
                        <img src={airlineBrand.img} alt={airlineBrand.name}/>
                    </div>
                )
            })
        }
    </div>
  )
}


const sampleData = [
    {
        name: 'Emirates',
        img: emiratesLogo,
        id: 1
    },
    {
        name: 'Oman Air',
        img: omanairLogo,
        id: 2
    },
    {
        name: 'TigerAir',
        img: tigerairLogo,
        id: 3
    },
    {
        name: 'Nepal Airlines',
        img: nepalAirlinesLogo,
        id: 4
    },
    {
        name: '',
        img: '',
        id:5,
        isinvisible: true
    },
    {
        name: 'Kuwait',
        img: kuwaitAirwaysLogo,
        id:6
    },
    {
        name: 'Scoot',
        img: scootLogo,
        id: 7
    },
    {
        name: 'Singapore Airlines',
        img: singaporeAirlinesLogo,
        id: 8
    },
    {
        name: '',
        img: '',
        id: 9,
        isinvisible: true
    },
    {
        name: '',
        img: '',
        id: 10,
        isinvisible: true
    },
    {
        name: 'Turkish Airlines',
        img: turkishAirlinesLogo,
        id: 11
    },
    {
        name: 'Etihad Airways',
        img: etihadAirwaysLogo,
        id: 12
    },
]


export default InternationalAirlines