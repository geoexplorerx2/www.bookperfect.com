import { FC } from "react"
import smilyFace from "../../images/SmileyXEyes.png"

interface NotFoundProps {
    innerWrapperClassNames?: string
    innerText?: string
}

const NotFound : FC<NotFoundProps> = (props)=>{
    const { innerWrapperClassNames, innerText } = props
    return (
        <div className="">
            {/* <p className="text-base dark:text-[#fff]">No records found</p> */}
            <div className={`${innerWrapperClassNames} w-full dark:bg-transparent min-h-[200px] py-2 bg-white border border-[#DADBE8] rounded-2xl flex flex-col justify-around items-center`}
            >
                {/* not found image */}
            <img 
                src={smilyFace} 
                alt='not-found-image'
                className="w-10 h-10"
                />
                <h3 className="dark:text-[#fff]">Oops!..</h3>
                <p className="text-xs opacity-80 dark:text-[#fff]">{innerText ? innerText : "No Travel Ideas found with this criteria" }</p>
            </div>
        </div>
    )
}

export default NotFound