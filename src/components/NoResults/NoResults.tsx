import { FC } from "react"
import smilyFace from "../../images/SmileyXEyes.png"
const NoResults : FC = ()=>{
    
    return (
        <div className="">
            <p className="text-base">No records found</p>
            <div className="w-full min-h-[200px] py-2 bg-white  border-[#DADBE8]
                             rounded-2xl flex flex-col justify-around items-center"
            >
                {/* the not-found image */}
            <img 
                src={smilyFace} 
                alt='not-found-image'
                className="w-10 h-10"
                />
                <h3>Oops!..</h3>
                <p className="text-xs opacity-80">No reuslts found with this criteria</p>
            </div>
        </div>
    )
}

export default NoResults