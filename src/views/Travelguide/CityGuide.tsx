import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import openaidata from '../../api/openai';
import { goToPage } from '../../common/goToPage';
import { CardCategory2 } from '../../components/CardCategory';
import CityGuideModal from '../../components/CityGuideModal/CityGuideModal';
import { TaxonomyType } from '../../data/types';
import Heading from '../../lib/Heading/Heading';
import { guideDetailData } from '../../store/actions';
interface CityGuideProps {
  heading?: string;
  subHeading?: string;
  city?: string;
  onGuideSelect?: any;
  guides?: any;
  taxonomy?: any;
};


const CityGuide: FC<CityGuideProps> = ({
  heading = "",
  subHeading = "",
  city,
  guides,
  onGuideSelect,
  taxonomy
}) => {
  const dispatch = useDispatch();
  const [AIguideData, setAIguideData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState<any>(null)
  const [isButtonClicked, setIsButtonClicked ] = useState(false)
  const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);

  let history = useHistory();
  // handle more guide
  const selectGuide = (guide: any) => {
    setSelectedGuide(guide);
    setIsModalOpen(false)
    setIsButtonClicked(true)
    let guide_id = guide.nid;
    dispatch(
      guideDetailData(guide_id)
    );

    // set active sidebar
    onGuideSelect(guide.title);
    // let dynamicUrl = window.location.pathname + "/travelguide";
    let dynamicUrl;
    // dynamicUrl = "/travelguide/" + taxonomy[0].name.toLowerCase() + "/" + taxonomy[1].name.toLowerCase() + "/" + taxonomy[1].tid + "/" + taxonomy[2].name.toLowerCase() + "/" + taxonomy[2].tid + '/travelguide/' + guide.id;
    // dynamicUrl = "/travelguide/" + taxonomy[0].name.toLowerCase() + "/" + taxonomy[1].name.toLowerCase() + "/" + taxonomy[1].tid + "/" + taxonomy[2].name.toLowerCase() +  "/" + taxonomy[2].tid + "/travelguide";
    // window.location.href = dynamicUrl;
    // history.push(dynamicUrl)
    // goToPage(dynamicUrl, '');
    // '/travelguide/asia/turkey/1078/istanbul/1092/travelguide'
    // /travelguide/asia/turkey/1078/istanbul/1092/travelguide
    // console.log({dynamicUrl});
    // history.replace(dynamicUrl);
  };


  useEffect(() => {
    
    const dynamicUrl = `/${activeLang}` + "/travelguide/" + taxonomy[0].name.toLowerCase() + "/" + taxonomy[1].name.toLowerCase() + "/" + taxonomy[1].tid + "/" + taxonomy[2].name.toLowerCase() + "/" + taxonomy[2].tid + '/travelguide/' + selectedGuide?.id;
    
    setIsButtonClicked(false)
    if(isButtonClicked) window.location.href = dynamicUrl;

  } ,
  [selectedGuide, isButtonClicked])

  // handle ai guide
  const openAIGuide = (guide: any) => {

    setSelectedGuide(guide);
    setIsModalOpen(true);
    setLoading(true);
    let req = city + " " + guide.title;
    openaidata(
      req,
      async (res: any) => {
        if (res.status === 200) {
          let aidata = res.data.choices[0].text.split("\n").filter((item: any) => item != "");
          setAIguideData(aidata);
          setLoading(false);
        } else {
          setAIguideData(null);
          setLoading(false);
        }
      }
    );
  };



  useEffect(() => {
    // console.log("AIResponse::: AIguideData " , AIguideData)
    // console.log("AIResponse::: loading" , loading)
  },
    [AIguideData, loading])

  return (
    <div className={`mx-[10vw] city-guide`}>
      <div className={`flow-root`}>
        {/* 
        <Heading
          desc={subHeading}
          isCenter={false}
        >
          {heading}
        </Heading> */}

        <div className={`relative flex flex-col sm:flex-row`}>
          <div className="flex-1">
            <h2 className={`text-[24px] text-[#FFFFFF] font-normal md:text-md leading-[114%] font-poppins`}>
              {heading}
            </h2>
            {subHeading && (
              <span className="mt-2 md:mt-2 text-[#FFFFFF] font-normal block text-sm text-base sm:text-sm text-neutral-500 dark:text-neutral-400">
                {subHeading}
              </span>
            )}
          </div>
        </div>

        <div className="glide__track py-8" data-glide-el="track">
          <ul className="glide__slides">
            <div className="flex flex-row flex-grow flex-nowrap w-full">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[10px] w-[100%]">
                {
                  guides &&
                  guides[0] &&
                  guides[0].field_info_subtopics.length > 0 &&
                  guides[0].field_info_subtopics?.map((guide: any) => (
                    guide.title !== 'Overview' &&
                    guide.type == 'subtopic' &&
                    <div className="py-1 sm:py-1 mr-[0.1vw]">
                      <a
                        // onClick={() => openAIGuide(guide)}
                        onClick={() => selectGuide(guide)}
                        className="text-blue-800 cursor-pointer relative bg-white dark:bg-transparent dark:text-[#fff] hover:bg-gray-300 focus:ring-4 border-2 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-8 py-2.5 flex justify-between w-full space-x-16">
                        {/* <span>{guide.objective}</span> */}
                        <span>{city} {":"} {guide && guide.title} </span>
                        <span className='absolute right-3'>
                          <svg className=" w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </span>
                      </a>
                    </div>

                  ))
                }
                {/* <CityGuideModal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  content={AIguideData}
                  loading={loading}
                  handleMoreButton={selectGuide}
                  guide={selectedGuide}
                /> */}
              </div>

            </div>

          </ul>
        </div>

      </div>
    </div>
  )
};

export default CityGuide;
