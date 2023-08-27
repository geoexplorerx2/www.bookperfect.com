import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import blog from '../../images/blog.png';
import bookmark from '../../images/bookmark.png'
const SampleNextArrow = () => {
    return (<>
    </>)
}
const SamplePrevArrow = () => {
    return (<>
    </>)
}
const Index = (data: any) => {

    const slider = React.useRef<Slider>(null)
    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <>
            <Slider ref={slider} {...settings}>
                {data.data.map((item: any, index: any) =>
                    <div className={`
                    hover:hover:shadow-[0_10px_40px_-30px_rgba(0,0,255,0.9)] transition-shadow
                        trip-idea-card group relative bg-white dark:bg-neutral-900 border 
                        border-neutral-100 dark:border-[#DADBE8] rounded-2xl overflow-hidden 
                        hover:shadow-xl`}
                        data-nc-id="trip-idea-card">
                        <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ">
                            <div className="relative">
                                <img className="w-full h-[202px]" src={blog} alt="product image" />

                                <div className='absolute left-3 bottom-3 w-18 h-8 bg-[#F96254] rounded-lg flex items-center justify-center text-xs py-0.5 px-3'>
                                    <img src={bookmark} className='w-4 h-4' />
                                    <span className='text-xs text-white ml-3'>May 08, 2020</span>
                                </div>

                            </div>
                            <div className="px-5 py-5 pb-5">
                                <a href="#">
                                    <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">Rome, Madrid and Lisbaa</h5>
                                </a>
                                <div className="flex mt-3 items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
                                    <span className="text-xs">Lorem, ipsum dolor sit amet consectetur .</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </Slider>
            <div>
                <div
                    className="nc-NextPrev relative flex items-center text-neutral-900 dark:text-neutral-300 justify-center mt-10"
                    data-nc-id="NextPrev" data-glide-el="controls">
                    <button onClick={() => slider?.current?.slickPrev()} className="w-10 h-10 mr-[6px] bg-white dark:bg-neutral-900 border border-[#3944B3] text-[#3944B3] dark:text-white dark:border-white  dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none"
                        title="Prev" data-glide-dir="<">
                        <i className="las la-angle-left"></i>
                    </button>
                    <button onClick={() => slider?.current?.slickNext()} className="w-10 h-10 bg-white dark:bg-neutral-900 border border-[#3944B3] text-[#3944B3] dark:text-white dark:border-white dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 focus:outline-none"
                        title="Next" data-glide-dir=">">
                        <i className="las la-angle-right"></i>
                    </button>
                </div>
            </div>
        </>

    )
}

export default Index
